// server/utils/wpgraphql.ts
import { GraphQLClient, type RequestDocument, type Variables } from 'graphql-request';
import { getCookie, setCookie, deleteCookie, createError, type H3Event } from 'h3';

const SESSION_COOKIE_NAME = 'woocommerce-session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function normalizeSession(token?: string | null): string | null {
  if (!token) return null;
  const trimmed = token.trim();
  if (!trimmed) return null;
  return trimmed.startsWith('Session ') ? trimmed : `Session ${trimmed}`;
}

function isTransientNetworkError(error: any): boolean {
  if (!error) return false;
  if (error?.response?.errors || error?.response?.status) return false;

  const msg = String(error?.message || '').toLowerCase();
  const name = String(error?.name || '').toLowerCase();
  const causeCode = String(error?.cause?.code || '').toUpperCase();
  const causeMsg = String(error?.cause?.message || '').toLowerCase();

  const transientCodes = [
    'UND_ERR_CONNECT_TIMEOUT',
    'UND_ERR_SOCKET',
    'UND_ERR_HEADERS_TIMEOUT',
    'ECONNRESET',
    'ECONNREFUSED',
    'ETIMEDOUT',
    'EAI_AGAIN',
    'ENOTFOUND',
    'EPIPE',
    'EHOSTUNREACH',
  ];

  if (transientCodes.includes(causeCode)) return true;
  if (name === 'timeouterror' || causeMsg.includes('timeout') || causeMsg.includes('connect timeout')) return true;
  if (msg.includes('fetch failed') || msg.includes('network error') || msg.includes('socket')) return true;

  return false;
}

async function resilientFetch(
  url: string | URL | Request,
  init?: RequestInit,
  maxRetries = 2
): Promise<Response> {
  let attempt = 0;
  while (true) {
    const timeoutSignal = AbortSignal.timeout(25000);
    const combinedSignal = init?.signal
      ? AbortSignal.any([init.signal, timeoutSignal])
      : timeoutSignal;

    try {
      return await fetch(url, {
        ...init,
        signal: combinedSignal,
      });
    } catch (err: any) {
      attempt++;
      const isTransient = isTransientNetworkError(err);
      const causeCode = err?.cause?.code || err?.cause?.message || err?.name;
      console.warn(
        `[wpgraphql] fetch attempt ${attempt} failed (${causeCode}):`,
        err?.message
      );

      if (!isTransient || attempt > maxRetries) {
        throw err;
      }

      const delay = attempt * 500 + Math.floor(Math.random() * 200);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function getClient(sessionHeader?: string | null, maxRetries = 2): GraphQLClient {
  const { gqlHost } = useRuntimeConfig();
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  const normalized = normalizeSession(sessionHeader);
  if (normalized) {
    headers['woocommerce-session'] = normalized;
  }
  return new GraphQLClient(gqlHost, {
    headers,
    fetch: (url, init) => resilientFetch(url, init, maxRetries),
  });
}

function toQueryString(query: RequestDocument): string {
  return typeof query === 'string' ? query : (query as any).loc?.source.body;
}

function persistSessionIfPresent(event: H3Event, responseHeaders?: Headers | null) {
  if (!responseHeaders) return;
  const newSession = responseHeaders.get(SESSION_COOKIE_NAME);
  if (newSession) {
    setCookie(event, SESSION_COOKIE_NAME, `Session ${newSession}`, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
    });
  }
}

export function clearCartSessionCookie(event: H3Event) {
  deleteCookie(event, SESSION_COOKIE_NAME, {
    path: '/',
  });
}

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function normalizeErrorMessage(rawMessage: string): string {
  const clean = stripHtmlTags(rawMessage);
  if (/failed to add cart item/i.test(clean)) {
    return 'امکان افزودن این کالا به سبد خرید وجود ندارد. لطفاً تنوع دیگری انتخاب کنید یا صفحه را رفرش نمایید.';
  }
  if (/no product found/i.test(clean)) {
    return 'کالای مورد نظر یافت نشد.';
  }
  if (/گزینه‌های محصول را انتخاب کنید/i.test(clean) || /لطفا با بازدید از/i.test(clean)) {
    return 'لطفاً ابتدا یکی از تنوع‌های معتبر محصول را انتخاب کنید.';
  }
  return clean;
}

async function handleError<T>(promise: Promise<T>, message: string): Promise<T> {
  try {
    return await promise;
  } catch (error: any) {
    const gqlErrors = error?.response?.errors;
    if (Array.isArray(gqlErrors) && gqlErrors.length > 0) {
      const rawGqlMessage = gqlErrors[0]?.message || '';
      const userMessage = normalizeErrorMessage(rawGqlMessage);
      console.warn(`[wpgraphql] Validation error:`, rawGqlMessage);
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: userMessage || message,
      });
    }

    const causeCode = error?.cause?.code || error?.cause?.message;
    const errorMsg = error?.message || message;
    console.error(`[wpgraphql] ${message}:`, errorMsg, causeCode ? `(Cause: ${causeCode})` : '');

    const isNetwork = isTransientNetworkError(error) || /fetch failed/i.test(errorMsg);
    const userMessage = isNetwork
      ? 'خطا در برقراری ارتباط با سرور. لطفاً پس از چند لحظه دوباره تلاش کنید.'
      : (errorMsg || message);

    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      message: userMessage,
      data: {
        isNetworkError: isNetwork,
        cause: causeCode || 'NETWORK_FAILURE',
      },
    });
  }
}

/**
 * Standard public GraphQL query (categories, products, etc.) without session header.
 */
export async function requestQuery<T = unknown>(query: RequestDocument, variables?: Variables): Promise<T> {
  return handleError(getClient().request<T>(query, variables), 'GraphQL query failed');
}

/**
 * Session-aware cart query (e.g. getCart).
 * If no session cookie exists, returns null without hitting GraphQL.
 * If session exists, queries WooGraphQL and captures any refreshed session header.
 *
 * NOTE: Network errors do NOT wipe out the user's session cookie. Only explicit
 * session invalidation from GraphQL errors will clear the session.
 */
export async function requestCartQuery<T = unknown>(
  event: H3Event,
  query: RequestDocument,
  variables?: Variables
): Promise<T | null> {
  const session = getCookie(event, SESSION_COOKIE_NAME);
  if (!session) {
    return null;
  }

  const client = getClient(session);
  const queryString = toQueryString(query);

  try {
    const res = await client.rawRequest<T>(queryString, variables);
    persistSessionIfPresent(event, res.headers);
    return res.data;
  } catch (error: any) {
    const gqlErrors = error?.response?.errors;
    const isInvalidSession =
      Array.isArray(gqlErrors) &&
      gqlErrors.some((e: any) =>
        /invalid.*session|expired.*session|customer.*not.*found/i.test(
          e?.message || ''
        )
      );

    if (isInvalidSession) {
      console.warn('[wpgraphql] session expired or invalid, clearing cookie');
      clearCartSessionCookie(event);
    } else {
      console.warn(
        '[wpgraphql] cart query error (preserving session cookie):',
        error?.message || error
      );
    }
    return null;
  }
}

/**
 * Session-aware mutation (addToCart, updateItemQuantities, removeItemsFromCart, emptyCart).
 * Passes active session if present, and captures/persists new session returned in response headers.
 * Defaults maxRetries to 0 to prevent accidental duplicate execution of non-idempotent operations.
 */
export async function requestMutation<T = unknown>(
  event: H3Event,
  query: RequestDocument,
  variables?: Variables,
  options?: { maxRetries?: number }
): Promise<T> {
  const session = getCookie(event, SESSION_COOKIE_NAME);
  // Default to 0 retries for mutations to prevent duplicate execution of non-idempotent operations (e.g. addToCart)
  const maxRetries = options?.maxRetries ?? 0;
  const client = getClient(session, maxRetries);
  const queryString = toQueryString(query);

  const res = await handleError(
    client.rawRequest<T>(queryString, variables),
    'GraphQL mutation failed'
  );

  persistSessionIfPresent(event, res.headers);
  return res.data;
}
