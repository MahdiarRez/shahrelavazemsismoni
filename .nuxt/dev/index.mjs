import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, getResponseStatus, createError, getCookie, setCookie, removeResponseHeader, getQuery as getQuery$1, readBody, handleCors, getRouterParam, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, sendNoContent, assertMethod, readFormData, setHeader, getValidatedRouterParams, getHeader, getValidatedQuery, getRequestWebStream, readValidatedBody, getResponseStatusText } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/h3@1.15.5/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/@vue+shared@3.5.28/node_modules/@vue/shared/dist/shared.cjs.js';
import { GraphQLClient, gql } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/graphql-request@7.1.0_graphql@16.12.0/node_modules/graphql-request/build/entrypoints/main.js';
import { z } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/zod@4.4.3/node_modules/zod/index.js';
import { createFetch, Headers as Headers$1, ofetch } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.9.3/node_modules/unstorage/dist/index.mjs';
import httpDriver from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.9.3/node_modules/unstorage/drivers/http.mjs';
import cloudflareKVBindingDriver from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.9.3/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs';
import mime from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/mime@4.1.0/node_modules/mime/dist/src/index.js';
import { z as z$1 } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.js';
import defu, { defuFn, createDefu, defu as defu$1 } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { randomUUID } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/uncrypto@0.1.3/node_modules/uncrypto/dist/crypto.node.mjs';
import { dirname as dirname$1, resolve as resolve$1, basename, isAbsolute, parse as parse$1 } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/vue-bundle-renderer@2.2.0/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import process$1 from 'node:process';
import { renderToString } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/vue@3.5.28_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unhead@2.1.4/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/devalue@5.6.2/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/vue@3.5.28_typescript@5.9.3/node_modules/vue/index.mjs';
import { createHooks } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.9.3/node_modules/unstorage/drivers/fs.mjs';
import { digest, hash as hash$1 } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/youch@4.1.0-beta.14/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import { createPathIndexLanguageParser, parseAcceptLanguage } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/@intlify+utils@0.13.0/node_modules/@intlify/utils/dist/index.mjs';
import { parse } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/cookie-es@2.0.0/node_modules/cookie-es/dist/index.mjs';
import { createRouterMatcher } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/vue-router@4.6.4_vue@3.5.28_typescript@5.9.3_/node_modules/vue-router/vue-router.node.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/errx@0.1.0/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { walkResolver } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/unhead@2.1.4/node_modules/unhead/dist/utils.mjs';
import { getIcons } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/@iconify+utils@2.3.0/node_modules/@iconify/utils/lib/index.mjs';
import { collections } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.nuxt/nuxt-icon-server-bundle.mjs';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/node_modules/.pnpm/ipx@2.1.1_db0@0.3.4_ioredis@5.9.3/node_modules/ipx/dist/index.mjs';

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const serverAssets = [{"baseName":"server","dir":"C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage$1 = createStorage({});

storage$1.mount('/assets', assets$1);

storage$1.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni","watchOptions":{"ignored":[null]}}));
storage$1.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/server","watchOptions":{"ignored":[null]}}));
storage$1.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.nuxt"}));
storage$1.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.nuxt/cache"}));
storage$1.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  site: {
    name: "\u0634\u0647\u0631 \u0644\u0648\u0627\u0632\u0645 \u0633\u06CC\u0633\u0645\u0648\u0646\u06CC",
    description: "NuxtCommerce is a dynamic e-commerce solution developed with Nuxt 4 and GraphQL, tailored for WooCommerce.",
    phone: "+982112345678",
    email: "info@sismoni.local",
    socials: [
      { icon: "i-iconamoon-comment-dots", url: "#", label: "WhatsApp" },
      { icon: "i-iconamoon-send-fill", url: "#", label: "Telegram" },
      { icon: "i-iconamoon-camera-image", url: "#", label: "Instagram" }
    ]
  },
  ui: {
    primary: "blue",
    gray: "neutral"
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary",
      "secondary",
      "alizarin-crimson"
    ],
    "strategy": "merge"
  }
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/": {
        "prerender": false
      },
      "/shop": {
        "cache": false
      },
      "/categories": {
        "cache": false
      },
      "/favorites": {
        "cache": false
      },
      "/payment/**": {
        "cache": false
      },
      "/api/_hub/**": {
        "csurf": false,
        "cache": false,
        "prerender": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "wpBaseUrl": "https://wordpress-sismooni.liara.run",
    "siteUrl": "http://localhost:3001",
    "zarinpalPaymentMethod": "WC_ZPal",
    "version": "3.1.17",
    "notivue": {
      "position": "top-center",
      "limit": 3,
      "notifications": {
        "global": {
          "duration": 3000
        }
      }
    },
    "hub": {},
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "fa",
      "rootRedirect": "",
      "redirectStatusCode": 302,
      "skipSettingLocaleOnNavigate": false,
      "locales": [
        {
          "code": "fa",
          "iso": "fa-IR",
          "name": "🇮🇷 فارسی",
          "dir": "rtl",
          "language": ""
        },
        {
          "code": "en",
          "iso": "en-GB",
          "name": "🇬🇧 English",
          "language": ""
        },
        {
          "code": "nb",
          "iso": "nb-NO",
          "name": "🇳🇴 Norsk (Bokmål)",
          "language": ""
        },
        {
          "code": "nl",
          "iso": "nl-NL",
          "name": "🇳🇱 Nederlands",
          "language": ""
        },
        {
          "code": "de",
          "iso": "de-DE",
          "name": "🇩🇪 Deutsch",
          "language": ""
        }
      ],
      "detectBrowserLanguage": false,
      "experimental": {
        "localeDetector": "",
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "alternateLinkCanonicalQueries": true,
        "devCache": false,
        "cacheLifetime": "",
        "stripMessagesPayload": false,
        "preload": false,
        "strictSeo": false,
        "nitroContextDetection": true
      },
      "domainLocales": {
        "fa": {
          "domain": ""
        },
        "en": {
          "domain": ""
        },
        "nb": {
          "domain": ""
        },
        "nl": {
          "domain": ""
        },
        "de": {
          "domain": ""
        }
      }
    }
  },
  "gqlHost": "https://wordpress-sismooni.liara.run/graphql",
  "wcConsumerKey": "",
  "wcConsumerSecret": "",
  "icon": {
    "serverKnownCssClasses": []
  },
  "hub": {
    "projectUrl": "",
    "projectSecretKey": "",
    "url": "https://admin.hub.nuxt.com",
    "projectKey": "",
    "userToken": "",
    "remote": "",
    "remoteManifest": "",
    "dir": "C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.data/hub",
    "workers": "",
    "ai": false,
    "analytics": false,
    "blob": false,
    "browser": false,
    "cache": false,
    "database": false,
    "kv": false,
    "vectorize": {},
    "databaseMigrationsDirs": [
      "C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/server/database/migrations"
    ],
    "databaseQueriesPaths": [],
    "version": "0.9.0",
    "env": "production",
    "openapi": false,
    "bindings": {
      "observability": {
        "logs": true
      },
      "hyperdrive": {},
      "compatibilityFlags": ""
    },
    "cloudflareAccess": {
      "clientId": "",
      "clientSecret": ""
    }
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": [
        "C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/public"
      ]
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const memoryStore = {};

  const NONCE = ${JSON.stringify(nonce)}
  
  const mockStorage = {
    getItem: function(key) {
      return memoryStore[key] !== undefined ? memoryStore[key] : null;
    },
    setItem: function(key, value) {
      memoryStore[key] = String(value);
      window.parent.postMessage({
        type: 'storage-set',
        key: key,
        value: String(value),
        nonce: NONCE
      }, '*');
    },
    removeItem: function(key) {
      delete memoryStore[key];
      window.parent.postMessage({
        type: 'storage-remove',
        key: key,
        nonce: NONCE
      }, '*');
    },
    clear: function() {
      for (const key in memoryStore) {
        delete memoryStore[key];
      }
      window.parent.postMessage({
        type: 'storage-clear',
        nonce: NONCE
      }, '*');
    },
    key: function(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] !== undefined ? keys[index] : null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };
  
  try {
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: false,
      configurable: true
    });
  } catch (e) {
    window.localStorage = mockStorage;
  }
  
  window.addEventListener('message', function(event) {
    if (event.data.type === 'storage-sync-data' && event.data.nonce === NONCE) {
      const data = event.data.data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          memoryStore[key] = data[key];
        }
      }
      if (typeof window.initTheme === 'function') {
        window.initTheme();
      }
      window.dispatchEvent(new Event('storage-ready'));
    }
  });
  
  window.parent.postMessage({ 
    type: 'storage-sync-request',
    nonce: NONCE
  }, '*');
})();
`
);
const parentStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;
  
  // Wait for shadow root to be attached
  const checkShadow = setInterval(function() {
    if (host.shadowRoot) {
      clearInterval(checkShadow);
      const iframe = host.shadowRoot.getElementById('frame');
      if (!iframe) return;

      const NONCE = ${JSON.stringify(nonce)}
      
      window.addEventListener('message', function(event) {
        if (!event.data || event.data.nonce !== NONCE) return;
        
        const data = event.data;
        
        if (data.type === 'storage-set') {
          localStorage.setItem(data.key, data.value);
        } else if (data.type === 'storage-remove') {
          localStorage.removeItem(data.key);
        } else if (data.type === 'storage-clear') {
          localStorage.clear();
        } else if (data.type === 'storage-sync-request') {
          const allData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allData[key] = localStorage.getItem(key);
          }
          iframe.contentWindow.postMessage({
            type: 'storage-sync-data',
            data: allData,
            nonce: NONCE
          }, '*');
        }
      });
    }
  }, 10);
})();
`
);
const errorCSS = (
  /* css */
  `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  right: 5px;
  bottom: 5px;
  left: auto;
  top: auto;
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: bottom right;
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 8px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 3px;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`
);
function webComponentScript(base64HTML, startMinimized) {
  return (
    /* js */
    `
  (function() {
    try {
      const host = document.querySelector('nuxt-error-overlay');
      if (!host) return;
      
      const shadow = host.attachShadow({ mode: 'open' });
      
      // Create elements
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(errorCSS)};
      
      const iframe = document.createElement('iframe');
      iframe.id = 'frame';
      iframe.src = 'data:text/html;base64,${base64HTML}';
      iframe.title = 'Detailed error stack trace';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      
      const preview = document.createElement('div');
      preview.id = 'preview';
      
      const button = document.createElement('button');
      button.id = 'toggle';
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';
      
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'sr-only';
      
      // Update preview snapshot
      function updatePreview() {
        try {
          let previewIframe = preview.querySelector('iframe');
          if (!previewIframe) {
            previewIframe = document.createElement('iframe');
            previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
            previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            preview.appendChild(previewIframe);
          }
          
          const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
          const cleanedHTML = document.documentElement.outerHTML
            .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
            .replace(/<script[^>]*>.*?<\\/script>/gs, '');
          
          const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(doctype + cleanedHTML);
          iframeDoc.close();
        } catch (error) {
          console.error('Failed to update preview:', error);
        }
      }
      
      function toggleView() {
        const isMinimized = iframe.hasAttribute('inert');
        
        if (isMinimized) {
          updatePreview();
          iframe.removeAttribute('inert');
          button.setAttribute('aria-expanded', 'true');
          liveRegion.textContent = 'Showing detailed error view';
          setTimeout(function() {
            try { iframe.contentWindow.focus(); } catch {}
          }, 100);
        } else {
          iframe.setAttribute('inert', '');
          button.setAttribute('aria-expanded', 'false');
          liveRegion.textContent = 'Showing error page';
          button.focus();
        }
      }
      
      button.onclick = toggleView;
      
      document.addEventListener('keydown', function(e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !iframe.hasAttribute('inert')) {
          toggleView();
        }
      });
      
      // Append to shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(liveRegion);
      shadow.appendChild(iframe);
      shadow.appendChild(preview);
      shadow.appendChild(button);
      
      if (${startMinimized}) {
        iframe.setAttribute('inert', '');
        button.setAttribute('aria-expanded', 'false');
      }
      
      // Initialize preview
      setTimeout(updatePreview, 100);
      
    } catch (error) {
      console.error('Failed to initialize Nuxt error overlay:', error);
    }
  })();
  `
  );
}
function generateErrorOverlayHTML(html, options) {
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
  const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
  const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
  return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return error500; });
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  {
    const prettyResponse = await defaultHandler(error, event, { json: false });
    return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= statusCode && statusCode < 500 })}</body>`));
  }
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function getClient() {
  const { gqlHost } = useRuntimeConfig();
  return new GraphQLClient(gqlHost, { headers: { "content-type": "application/json" } });
}
async function handleError(promise, message) {
  var _a, _b, _c;
  try {
    return await promise;
  } catch (error) {
    const gqlMessage = (_c = (_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.errors) == null ? void 0 : _b[0]) == null ? void 0 : _c.message;
    console.error(`[wpgraphql] ${message}:`, gqlMessage || (error == null ? void 0 : error.message) || error);
    throw createError({
      statusCode: 502,
      statusMessage: "Bad Gateway",
      message: gqlMessage || message
    });
  }
}
async function requestQuery(query, variables) {
  return handleError(getClient().request(query, variables), "GraphQL query failed");
}
async function requestMutation(event, query, variables) {
  var _a;
  const session = getCookie(event, "woocommerce-session");
  const client = getClient();
  if (!session) {
    const queryString = typeof query === "string" ? query : (_a = query.loc) == null ? void 0 : _a.source.body;
    const res = await handleError(client.rawRequest(queryString, variables), "GraphQL mutation failed");
    const newSession = res.headers.get("woocommerce-session");
    if (newSession) {
      setCookie(event, "woocommerce-session", `Session ${newSession}`, {
        path: "/",
        httpOnly: true,
        sameSite: "lax"
      });
    }
    return res.data;
  }
  return handleError(client.request(query, variables, { ["woocommerce-session"]: session }), "GraphQL mutation failed");
}

const hubHooks = createHooks();

const _71Ar3e40vFylaccfOP4yZS_Ep0wee4slWEOcenVu5HU = defineNitroPlugin(async () => {
  await globalThis.__env__;
  await hubHooks.callHookParallel("bindings:ready");
});

function useI18nContext(event) {
  if (event.context.nuxtI18n == null) {
    throw new Error("Nuxt I18n server context has not been set up yet.");
  }
  return event.context.nuxtI18n;
}
function tryUseI18nContext(event) {
  return event.context.nuxtI18n;
}
const headers = new Headers({ "x-nuxt-i18n": "internal" });
{
  headers.set("Cache-Control", "no-cache");
}
function createI18nContext() {
  return {
    messages: {},
    slp: {},
    localeConfigs: {},
    trackMap: {},
    vueI18nOptions: void 0,
    trackKey(key, locale) {
      this.trackMap[locale] ??= /* @__PURE__ */ new Set();
      this.trackMap[locale].add(key);
    }
  };
}

/*!
  * shared v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const _create = Object.create;
const create = (obj = null) => _create(obj);
/* eslint-enable */
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (val) => val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);

const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(src, des) {
    // src and des should both be objects, and none of them can be a array
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
        throw new Error('Invalid value');
    }
    const stack = [{ src, des }];
    while (stack.length) {
        const { src, des } = stack.pop();
        // using `Object.keys` which skips prototype properties
        Object.keys(src).forEach(key => {
            if (key === '__proto__') {
                return;
            }
            // if src[key] is an object/array, set des[key]
            // to empty object/array to prevent setting by reference
            if (isObject(src[key]) && !isObject(des[key])) {
                des[key] = Array.isArray(src[key]) ? [] : create();
            }
            if (isNotObjectOrIsArray(des[key]) || isNotObjectOrIsArray(src[key])) {
                // replace with src[key] when:
                // src[key] or des[key] is not an object, or
                // src[key] or des[key] is an array
                des[key] = src[key];
            }
            else {
                // src[key] and des[key] are both objects, merge them
                stack.push({ src: src[key], des: des[key] });
            }
        });
    }
}

function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
  const matchedLocales = matchBrowserLocale(
    locales.map((l) => ({ code: l.code, language: l.language || l.code })),
    browserLocales
  );
  return matchedLocales.sort(compareBrowserLocale).at(0)?.code ?? "";
}

// @ts-nocheck
const localeCodes =  [
  "fa",
  "en",
  "nb",
  "nl",
  "de"
];
const localeLoaders = {
  fa: [
    {
      key: "locale_fa_45IR_46json_c0f4f6bf",
      load: () => Promise.resolve().then(function () { return faIR$1; }),
      cache: true
    }
  ],
  en: [
    {
      key: "locale_en_45GB_46json_78b8fd59",
      load: () => Promise.resolve().then(function () { return enGB$1; }),
      cache: true
    }
  ],
  nb: [
    {
      key: "locale_nb_45NO_46json_625a99c3",
      load: () => Promise.resolve().then(function () { return nbNO$1; }),
      cache: true
    }
  ],
  nl: [
    {
      key: "locale_nl_45NL_46json_d60d1c60",
      load: () => Promise.resolve().then(function () { return nlNL$1; }),
      cache: true
    }
  ],
  de: [
    {
      key: "locale_de_45DE_46json_aa78249f",
      load: () => Promise.resolve().then(function () { return deDE$1; }),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "fa",
    iso: "fa-IR",
    name: "🇮🇷 فارسی",
    dir: "rtl",
    language: undefined
  },
  {
    code: "en",
    iso: "en-GB",
    name: "🇬🇧 English",
    language: undefined
  },
  {
    code: "nb",
    iso: "nb-NO",
    name: "🇳🇴 Norsk (Bokmål)",
    language: undefined
  },
  {
    code: "nl",
    iso: "nl-NL",
    name: "🇳🇱 Nederlands",
    language: undefined
  },
  {
    code: "de",
    iso: "de-DE",
    name: "🇩🇪 Deutsch",
    language: undefined
  }
];

function createLocaleConfigs(fallbackLocale) {
  const localeConfigs = {};
  for (const locale of localeCodes) {
    const fallbacks = getFallbackLocaleCodes(fallbackLocale, [locale]);
    const cacheable = isLocaleWithFallbacksCacheable(locale, fallbacks);
    localeConfigs[locale] = { fallbacks, cacheable };
  }
  return localeConfigs;
}
function getFallbackLocaleCodes(fallback, locales) {
  if (fallback === false) return [];
  if (isArray(fallback)) return fallback;
  let fallbackLocales = [];
  if (isString(fallback)) {
    if (locales.every((locale) => locale !== fallback)) {
      fallbackLocales.push(fallback);
    }
    return fallbackLocales;
  }
  const targets = [...locales, "default"];
  for (const locale of targets) {
    if (locale in fallback == false) continue;
    fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
  }
  return fallbackLocales;
}
function isLocaleCacheable(locale) {
  return localeLoaders[locale] != null && localeLoaders[locale].every((loader) => loader.cache !== false);
}
function isLocaleWithFallbacksCacheable(locale, fallbackLocales) {
  return isLocaleCacheable(locale) && fallbackLocales.every((fallbackLocale) => isLocaleCacheable(fallbackLocale));
}
function getDefaultLocaleForDomain(host) {
  return normalizedLocales.find((l) => !!l.defaultForDomains?.includes(host))?.code;
}
const isSupportedLocale = (locale) => localeCodes.includes(locale || "");

const __nuxtMock = { runWithContext: async (fn) => await fn() };
const merger = createDefu((obj, key, value) => {
  if (key === "messages" || key === "datetimeFormats" || key === "numberFormats") {
    obj[key] ??= create(null);
    deepCopy(value, obj[key]);
    return true;
  }
});
async function loadVueI18nOptions(vueI18nConfigs) {
  const nuxtApp = __nuxtMock;
  let vueI18nOptions = { messages: create(null) };
  for (const configFile of vueI18nConfigs) {
    const resolver = await configFile().then((x) => x.default);
    const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
    vueI18nOptions = merger(create(null), resolved, vueI18nOptions);
  }
  vueI18nOptions.fallbackLocale ??= false;
  return vueI18nOptions;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
const isResolvedModule = (val) => isModule(val) || true;
async function getLocaleMessages(locale, loader) {
  const nuxtApp = __nuxtMock;
  try {
    const getter = await nuxtApp.runWithContext(loader.load).then((x) => isResolvedModule(x) ? x.default : x);
    return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
  } catch (e) {
    throw new Error(`Failed loading locale (${locale}): ` + e.message);
  }
}
async function getLocaleMessagesMerged(locale, loaders = []) {
  const nuxtApp = __nuxtMock;
  const merged = {};
  for (const loader of loaders) {
    deepCopy(await nuxtApp.runWithContext(async () => await getLocaleMessages(locale, loader)), merged);
  }
  return merged;
}

const setupVueI18nOptions = async (defaultLocale) => {
  const options = await loadVueI18nOptions(vueI18nConfigs);
  options.locale = defaultLocale || options.locale || "en-US";
  options.defaultLocale = defaultLocale;
  options.fallbackLocale ??= false;
  options.messages ??= {};
  for (const locale of localeCodes) {
    options.messages[locale] ??= {};
  }
  return options;
};

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

function useRuntimeI18n(nuxtApp) {
  {
    return useRuntimeConfig().public.i18n;
  }
}
function useI18nDetection(nuxtApp) {
  const detectBrowserLanguage = useRuntimeI18n().detectBrowserLanguage;
  const detect = detectBrowserLanguage || {};
  return {
    ...detect,
    enabled: !!detectBrowserLanguage,
    cookieKey: detect.cookieKey || "i18n_redirected"
  };
}
function resolveRootRedirect(config) {
  if (!config) return void 0;
  return {
    path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
    code: !isString(config) && config.statusCode || 302
  };
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

const separator = "___";
const pathLanguageParser = createPathIndexLanguageParser(0);
const getLocaleFromRoutePath = (path) => pathLanguageParser(path);
const getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
  return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
  const input = normalizeInput(route);
  return input[0] === "/" ? getLocaleFromRoutePath(input) : getLocaleFromRouteName(input);
}

function matchDomainLocale(locales, host, pathLocale) {
  const normalizeDomain = (domain = "") => domain.replace(/https?:\/\//, "");
  const matches = locales.filter(
    (locale) => normalizeDomain(locale.domain) === host || toArray(locale.domains).includes(host)
  );
  if (matches.length <= 1) {
    return matches[0]?.code;
  }
  return (
    // match by current path locale
    matches.find((l) => l.code === pathLocale)?.code || // fallback to default locale for the domain
    matches.find((l) => l.defaultForDomains?.includes(host) ?? l.domainDefault)?.code
  );
}

const getCookieLocale = (event, cookieName) => {
  const cookieValue = getRequestHeader(event, "cookie") || "";
  return parse(cookieValue)[cookieName];
};
const getRouteLocale = (event, route) => getLocaleFromRoute(route);
const getHeaderLocale = (event) => {
  return findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader(event, "accept-language") || ""));
};
const getHostLocale = (event, path, domainLocales) => {
  const host = getRequestURL(event, { xForwardedHost: true }).host;
  const locales = normalizedLocales.map((l) => ({
    ...l,
    domain: domainLocales[l.code]?.domain ?? l.domain
  }));
  return matchDomainLocale(locales, host, getLocaleFromRoutePath(path));
};
const useDetectors = (event, config, nuxtApp) => {
  if (!event) {
    throw new Error("H3Event is required for server-side locale detection");
  }
  const runtimeI18n = useRuntimeI18n();
  return {
    cookie: () => getCookieLocale(event, config.cookieKey),
    header: () => getHeaderLocale(event) ,
    navigator: () => void 0,
    host: (path) => getHostLocale(event, path, runtimeI18n.domainLocales),
    route: (path) => getRouteLocale(event, path)
  };
};

// Generated by @nuxtjs/i18n
const pathToI18nConfig = {
  "/shop": {
    "fa": "/shop",
    "en": "/shop",
    "nb": "/shop",
    "nl": "/shop",
    "de": "/shop"
  },
  "/": {
    "fa": "/",
    "en": "/",
    "nb": "/",
    "nl": "/",
    "de": "/"
  },
  "/favorites": {
    "fa": "/favorites",
    "en": "/favorites",
    "nb": "/favorites",
    "nl": "/favorites",
    "de": "/favorites"
  },
  "/categories": {
    "fa": "/categories",
    "en": "/categories",
    "nb": "/categories",
    "nl": "/categories",
    "de": "/categories"
  },
  "/payment/failed": {
    "fa": "/payment/failed",
    "en": "/payment/failed",
    "nb": "/payment/failed",
    "nl": "/payment/failed",
    "de": "/payment/failed"
  },
  "/payment/success": {
    "fa": "/payment/success",
    "en": "/payment/success",
    "nb": "/payment/success",
    "nl": "/payment/success",
    "de": "/payment/success"
  },
  "/product/:sku()/:slug()": {
    "fa": "/product/:sku()/:slug()",
    "en": "/product/:sku()/:slug()",
    "nb": "/product/:sku()/:slug()",
    "nl": "/product/:sku()/:slug()",
    "de": "/product/:sku()/:slug()"
  }
};
const i18nPathToPath = {
  "/shop": "/shop",
  "/": "/",
  "/favorites": "/favorites",
  "/categories": "/categories",
  "/payment/failed": "/payment/failed",
  "/payment/success": "/payment/success",
  "/product/:sku()/:slug()": "/product/:sku()/:slug()"
};

const matcher = createRouterMatcher([], {});
for (const path of Object.keys(i18nPathToPath)) {
  matcher.addRoute({ path, component: () => "", meta: {} });
}
const getI18nPathToI18nPath = (path, locale) => {
  if (!path || !locale) return;
  const plainPath = i18nPathToPath[path];
  const i18nConfig = pathToI18nConfig[plainPath];
  if (i18nConfig && i18nConfig[locale]) {
    return i18nConfig[locale] === true ? plainPath : i18nConfig[locale];
  }
};
function isExistingNuxtRoute(path) {
  if (path === "") return;
  const resolvedMatch = matcher.resolve({ path }, { path: "/", name: "", matched: [], params: {}, meta: {} });
  return resolvedMatch.matched.length > 0 ? resolvedMatch : void 0;
}
function matchLocalized(path, locale, defaultLocale) {
  if (path === "") return;
  const parsed = parsePath(path);
  const resolvedMatch = matcher.resolve(
    { path: parsed.pathname || "/" },
    { path: "/", name: "", matched: [], params: {}, meta: {} }
  );
  if (resolvedMatch.matched.length > 0) {
    const alternate = getI18nPathToI18nPath(resolvedMatch.matched[0].path, locale);
    const match = matcher.resolve(
      { params: resolvedMatch.params },
      { path: alternate || "/", name: "", matched: [], params: {}, meta: {} }
    );
    const isPrefixable = prefixable(locale, defaultLocale);
    return withLeadingSlash(joinURL(isPrefixable ? locale : "", match.path));
  }
}
function prefixable(currentLocale, defaultLocale) {
  return   (currentLocale !== defaultLocale || "prefix_except_default" === "prefix");
}

const getHost = (event) => getRequestURL(event, { xForwardedHost: true }).host;
function* detect(detectors, detection, path) {
  if (detection.enabled) {
    yield { locale: detectors.cookie(), source: "cookie" };
    yield { locale: detectors.header(), source: "header" };
  }
  {
    yield { locale: detectors.route(path), source: "route" };
  }
  yield { locale: detection.fallbackLocale, source: "fallback" };
}
const _HeqjAOglWgvpNEDZHSqNKa_DIhC4bak4jICUqafbQ = defineNitroPlugin(async (nitro) => {
  const runtimeI18n = useRuntimeI18n();
  const rootRedirect = resolveRootRedirect(runtimeI18n.rootRedirect);
  const _defaultLocale = runtimeI18n.defaultLocale || "";
  try {
    const cacheStorage = useStorage("cache");
    const cachedKeys = await cacheStorage.getKeys("nitro:handlers:i18n");
    await Promise.all(cachedKeys.map((key) => cacheStorage.removeItem(key)));
  } catch {
  }
  const detection = useI18nDetection();
  const cookieOptions = {
    path: "/",
    domain: detection.cookieDomain || void 0,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: detection.cookieSecure
  };
  const createBaseUrlGetter = () => {
    isFunction(runtimeI18n.baseUrl) ? "" : runtimeI18n.baseUrl || "";
    if (isFunction(runtimeI18n.baseUrl)) {
      console.warn("[nuxt-i18n] Configuring baseUrl as a function is deprecated and will be removed in v11.");
      return () => "";
    }
    return (event, defaultLocale) => {
      return "";
    };
  };
  function resolveRedirectPath(event, path, pathLocale, defaultLocale, detector) {
    let locale = "";
    for (const detected of detect(detector, detection, event.path)) {
      if (detected.locale && isSupportedLocale(detected.locale)) {
        locale = detected.locale;
        break;
      }
    }
    locale ||= defaultLocale;
    function getLocalizedMatch(locale2) {
      const res = matchLocalized(path || "/", locale2, defaultLocale);
      if (res && res !== event.path) {
        return res;
      }
    }
    let resolvedPath = void 0;
    let redirectCode = 302;
    const requestURL = getRequestURL(event);
    if (rootRedirect && requestURL.pathname === "/") {
      locale = detection.enabled && locale || defaultLocale;
      resolvedPath = isSupportedLocale(detector.route(rootRedirect.path)) && rootRedirect.path || matchLocalized(rootRedirect.path, locale, defaultLocale);
      redirectCode = rootRedirect.code;
    } else if (runtimeI18n.redirectStatusCode) {
      redirectCode = runtimeI18n.redirectStatusCode;
    }
    switch (detection.redirectOn) {
      case "root":
        if (requestURL.pathname !== "/") break;
      // fallthrough (root has no prefix)
      case "no prefix":
        if (pathLocale) break;
      // fallthrough to resolve
      case "all":
        resolvedPath ??= getLocalizedMatch(locale);
        break;
    }
    if (requestURL.pathname === "/" && "prefix_except_default" === "prefix") ;
    return { path: resolvedPath, code: redirectCode, locale };
  }
  const baseUrlGetter = createBaseUrlGetter();
  nitro.hooks.hook("request", async (event) => {
    const options = await setupVueI18nOptions(getDefaultLocaleForDomain(getHost(event)) || _defaultLocale);
    const url = getRequestURL(event);
    const ctx = createI18nContext();
    event.context.nuxtI18n = ctx;
    {
      const detector = useDetectors(event, detection);
      const localeSegment = detector.route(event.path);
      const pathLocale = isSupportedLocale(localeSegment) && localeSegment || void 0;
      const path = pathLocale && url.pathname.slice(pathLocale.length + 1) || url.pathname;
      if (!url.pathname.includes("/_i18n/") && !isExistingNuxtRoute(path)) {
        return;
      }
      const resolved = resolveRedirectPath(event, path, pathLocale, options.defaultLocale, detector);
      if (resolved.path && resolved.path !== url.pathname) {
        ctx.detectLocale = resolved.locale;
        detection.useCookie && setCookie(event, detection.cookieKey, resolved.locale, cookieOptions);
        await sendRedirect(
          event,
          joinURL(baseUrlGetter(event, options.defaultLocale), resolved.path + url.search),
          resolved.code
        );
        return;
      }
    }
    const localeConfigs = createLocaleConfigs(options.fallbackLocale);
    ctx.vueI18nOptions = options;
    ctx.localeConfigs = localeConfigs;
  });
  nitro.hooks.hook("render:html", (htmlContext, { event }) => {
    tryUseI18nContext(event);
  });
});

const rootDir = "C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _ZT_oflw7iNyJv46uVCkD90VndNFw49Yo3E2Hu_mXkrk = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _8vYgmtDLOA88i6mW6v6PxAnbGR6C21fOQ7zFXbuLeQ = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const _Hny4mpHC2_0XvtTuesdJjyaJoCeQiDR7nPbUJIYbig = defineNitroPlugin(() => {
  if (process.env.WP_INSECURE_TLS === "true") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.warn(
      "[wp-tls] TLS certificate verification is DISABLED for outbound requests (WP_INSECURE_TLS=true). Use a trusted certificate in production."
    );
  }
});

const plugins = [
  _71Ar3e40vFylaccfOP4yZS_Ep0wee4slWEOcenVu5HU,
_HeqjAOglWgvpNEDZHSqNKa_DIhC4bak4jICUqafbQ,
_ZT_oflw7iNyJv46uVCkD90VndNFw49Yo3E2Hu_mXkrk,
_8vYgmtDLOA88i6mW6v6PxAnbGR6C21fOQ7zFXbuLeQ,
_Hny4mpHC2_0XvtTuesdJjyaJoCeQiDR7nPbUJIYbig
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _Mf9Vne = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file://C:/Users/mahdiar.rezaee/Desktop/shahrelavazemsismoni/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const precomputed = void 0 ;
  const renderer = createRenderer(createSSRApp, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: renderToString$1,
    buildAssetsURL
  });
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process$1.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const precomputed = void 0 ;
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const renderer = createRenderer(() => () => {
  }, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: () => spaTemplate,
    buildAssetsURL
  });
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _bFaEWI = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola$1.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  } else {
    if (collectionName && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
      consola$1.warn([
        `[Icon] Collection \`${collectionName}\` is not found locally`,
        `We suggest to install it via \`npm i -D @iconify-json/${collectionName}\` to provide the best end-user experience.`
      ].join("\n"));
      warnOnceSet.add(collectionName);
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola$1.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola$1.error(e);
      if (e.status === 404)
        return createError({ status: 404 });
      else
        return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery$1(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _Bk6N4b = eventHandler((event) => {
  handleCors(event, {
    methods: "*",
    origin: [
      "https://admin.hub.nuxt.com",
      "https://hub.nuxt.dev",
      /http:\/\/localhost:\d+/
    ]
  });
});

const storage = prefixStorage(useStorage(), "i18n");
function cachedFunctionI18n(fn, opts) {
  opts = { maxAge: 1, ...opts };
  const pending = {};
  async function get(key, resolver) {
    const isPending = pending[key];
    if (!isPending) {
      pending[key] = Promise.resolve(resolver());
    }
    try {
      return await pending[key];
    } finally {
      delete pending[key];
    }
  }
  return async (...args) => {
    const key = [opts.name, opts.getKey(...args)].join(":").replace(/:\/$/, ":index");
    const maxAge = opts.maxAge ?? 1;
    const isCacheable = !opts.shouldBypassCache(...args) && maxAge >= 0;
    const cache = isCacheable && await storage.getItemRaw(key);
    if (!cache || cache.ttl < Date.now()) {
      pending[key] = Promise.resolve(fn(...args));
      const value = await get(key, () => fn(...args));
      if (isCacheable) {
        await storage.setItemRaw(key, { ttl: Date.now() + maxAge * 1e3, value, mtime: Date.now() });
      }
      return value;
    }
    return cache.value;
  };
}

const _getMessages = async (locale) => {
  return { [locale]: await getLocaleMessagesMerged(locale, localeLoaders[locale]) };
};
cachedFunctionI18n(_getMessages, {
  name: "messages",
  maxAge: -1 ,
  getKey: (locale) => locale,
  shouldBypassCache: (locale) => !isLocaleCacheable(locale)
});
const getMessages = _getMessages ;
const _getMergedMessages = async (locale, fallbackLocales) => {
  const merged = {};
  try {
    if (fallbackLocales.length > 0) {
      const messages = await Promise.all(fallbackLocales.map(getMessages));
      for (const message2 of messages) {
        deepCopy(message2, merged);
      }
    }
    const message = await getMessages(locale);
    deepCopy(message, merged);
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message);
  }
};
const getMergedMessages = cachedFunctionI18n(_getMergedMessages, {
  name: "merged-single",
  maxAge: -1 ,
  getKey: (locale, fallbackLocales) => `${locale}-[${[...new Set(fallbackLocales)].sort().join("-")}]`,
  shouldBypassCache: (locale, fallbackLocales) => !isLocaleWithFallbacksCacheable(locale, fallbackLocales)
});
const _getAllMergedMessages = async (locales) => {
  const merged = {};
  try {
    const messages = await Promise.all(locales.map(getMessages));
    for (const message of messages) {
      deepCopy(message, merged);
    }
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message);
  }
};
cachedFunctionI18n(_getAllMergedMessages, {
  name: "merged-all",
  maxAge: -1 ,
  getKey: (locales) => locales.join("-"),
  shouldBypassCache: (locales) => !locales.every((locale) => isLocaleCacheable(locale))
});

const _messagesHandler = defineEventHandler(async (event) => {
  const locale = getRouterParam(event, "locale");
  if (!locale) {
    throw createError({ status: 400, message: "Locale not specified." });
  }
  const ctx = useI18nContext(event);
  if (ctx.localeConfigs && locale in ctx.localeConfigs === false) {
    throw createError({ status: 404, message: `Locale '${locale}' not found.` });
  }
  const messages = await getMergedMessages(locale, ctx.localeConfigs?.[locale]?.fallbacks ?? []);
  deepCopy(messages, ctx.messages);
  return ctx.messages;
});
const _cachedMessageLoader = defineCachedFunction(_messagesHandler, {
  name: "i18n:messages-internal",
  maxAge: -1 ,
  getKey: (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-"),
  shouldBypassCache(event) {
    const locale = getRouterParam(event, "locale");
    if (locale == null) return false;
    return !useI18nContext(event).localeConfigs?.[locale]?.cacheable;
  }
});
defineCachedEventHandler(_cachedMessageLoader, {
  name: "i18n:messages",
  maxAge: -1 ,
  swr: false,
  getKey: (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-")
});
const _g2gfn8 = _messagesHandler ;

const __uQDfx = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_AB4sXI = () => Promise.resolve().then(function () { return add_post$1; });
const _lazy_0CkKyr = () => Promise.resolve().then(function () { return update_post$1; });
const _lazy_4RYOPE = () => Promise.resolve().then(function () { return categories_get$1; });
const _lazy_KUlcdo = () => Promise.resolve().then(function () { return checkout_post$1; });
const _lazy_rYcwwC = () => Promise.resolve().then(function () { return newsletter_post$1; });
const _lazy_wBBb8_ = () => Promise.resolve().then(function () { return verify_get$1; });
const _lazy_E3IGdG = () => Promise.resolve().then(function () { return product_get$1; });
const _lazy_cb5BDq = () => Promise.resolve().then(function () { return products_get$1; });
const _lazy_Hax4Wi = () => Promise.resolve().then(function () { return search_get$1; });
const _lazy_n9CgS_ = () => Promise.resolve().then(function () { return ____feature_$1; });
const _lazy_CdgIjK = () => Promise.resolve().then(function () { return index_head$1; });
const _lazy_OD7K2N = () => Promise.resolve().then(function () { return manifest_get$1; });
const _lazy_CTqvK2 = () => Promise.resolve().then(function () { return syncVariables_post$1; });
const _lazy_qKHfdC = () => Promise.resolve().then(function () { return robots_txt$1; });
const _lazy_tnLNJT = () => Promise.resolve().then(function () { return sitemap_xml$1; });
const _lazy_uyGZ9V = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _Mf9Vne, lazy: false, middleware: true, method: undefined },
  { route: '/api/cart/add', handler: _lazy_AB4sXI, lazy: true, middleware: false, method: "post" },
  { route: '/api/cart/update', handler: _lazy_0CkKyr, lazy: true, middleware: false, method: "post" },
  { route: '/api/categories', handler: _lazy_4RYOPE, lazy: true, middleware: false, method: "get" },
  { route: '/api/checkout', handler: _lazy_KUlcdo, lazy: true, middleware: false, method: "post" },
  { route: '/api/newsletter', handler: _lazy_rYcwwC, lazy: true, middleware: false, method: "post" },
  { route: '/api/payment/verify', handler: _lazy_wBBb8_, lazy: true, middleware: false, method: "get" },
  { route: '/api/product', handler: _lazy_E3IGdG, lazy: true, middleware: false, method: "get" },
  { route: '/api/products', handler: _lazy_cb5BDq, lazy: true, middleware: false, method: "get" },
  { route: '/api/search', handler: _lazy_Hax4Wi, lazy: true, middleware: false, method: "get" },
  { route: '/api/_hub/**:feature', handler: _lazy_n9CgS_, lazy: true, middleware: false, method: undefined },
  { route: '/api/_hub', handler: _lazy_CdgIjK, lazy: true, middleware: false, method: "head" },
  { route: '/api/_hub/manifest', handler: _lazy_OD7K2N, lazy: true, middleware: false, method: "get" },
  { route: '/api/_hub/sync-variables', handler: _lazy_CTqvK2, lazy: true, middleware: false, method: "post" },
  { route: '/robots.txt', handler: _lazy_qKHfdC, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _lazy_tnLNJT, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_uyGZ9V, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _bFaEWI, lazy: false, middleware: false, method: undefined },
  { route: '/api/_hub', handler: _Bk6N4b, lazy: false, middleware: true, method: undefined },
  { route: '/_i18n/:hash/:locale/messages.json', handler: _g2gfn8, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: __uQDfx, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_uyGZ9V, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "statusCode": 500, "statusMessage": "Internal server error", "description": "This page is temporarily unavailable.", "refresh": "Refresh this page" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage) + " | " + escapeHtml(messages.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(messages.statusCode) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(messages.statusMessage) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

var general$4 = {
	go_back: "بازگشت",
	loading: "... در حال بارگذاری"
};
var theme$4 = {
	dark: "تاریک",
	light: "روشن",
	system: "سیستم",
	toggle: "تغییر پوسته"
};
var nav$4 = {
	home: "خانه",
	shop: "فروشگاه",
	categories: "دسته‌بندی‌ها",
	favorites: "علاقه‌مندی‌ها",
	products: "محصولات"
};
var footer$4 = {
	developed_by_author: "توسعه یافته توسط {author}",
	change_language: "تغییر زبان",
	about: "فروشگاه آنلاین لوازم سیسمونی و مراقبت از نوزاد؛ خرید مطمئن با ارسال سریع.",
	quick_links: "دسترسی سریع",
	customer_service: "پشتیبانی مشتریان",
	trust_title: "خرید مطمئن",
	trust_text: "پرداخت امن و حفاظت از اطلاعات شما",
	copyright: "© {year} {name} — تمامی حقوق محفوظ است."
};
var home$4 = {
	seo: {
		title: "{name} | خرید لوازم سیسمونی و نوزاد",
		description: "جدیدترین و بهترین لوازم سیسمونی و نوزاد را با قیمت مناسب و ارسال سریع از شهر لوازم سیسمونی بخرید."
	},
	hero: {
		badge: "همه چیز برای نوزاد شما",
		title: "بهترین لوازم سیسمونی برای آرامش شما و نوزادتان",
		subtitle: "مجموعه‌ای کامل از محصولات با کیفیت، با ضمانت اصالت و ارسال سریع به سراسر کشور.",
		cta_primary: "شروع خرید",
		cta_secondary: "مشاهده دسته‌بندی‌ها",
		stats: {
			customers: "+۱۰٬۰۰۰ خرید موفق",
			authentic: "ضمانت اصالت کالا",
			delivery: "ارسال سریع به سراسر کشور"
		}
	},
	benefits: {
		shipping: {
			title: "ارسال سریع",
			description: "تحویل به سراسر کشور"
		},
		secure: {
			title: "پرداخت امن",
			description: "درگاه پرداخت معتبر"
		},
		returns: {
			title: "بازگشت کالا",
			description: "ضمانت بازگشت ۷ روزه"
		},
		support: {
			title: "پشتیبانی",
			description: "پاسخگویی در تمام روزها"
		}
	},
	sections: {
		categories: "دسته‌بندی‌ها",
		featured: "محصولات ویژه",
		new_arrivals: "جدیدترین محصولات",
		on_sale: "تخفیف‌ها"
	},
	view_all: "مشاهده همه",
	promo: {
		title: "حراج ویژه لوازم سیسمونی",
		subtitle: "بهترین فرصت برای خرید با تخفیف‌های شگفت‌انگیز را از دست ندهید.",
		cta: "مشاهده تخفیف‌ها"
	},
	newsletter: {
		title: "از تخفیف‌ها باخبر شوید",
		subtitle: "ایمیل خود را وارد کنید تا جدیدترین محصولات و تخفیف‌ها را برایتان بفرستیم.",
		placeholder: "ایمیل شما",
		cta: "عضویت",
		invalid: "لطفاً یک ایمیل معتبر وارد کنید",
		success: "با موفقیت عضو شدید!",
		error: "خطایی رخ داد. دوباره تلاش کنید."
	}
};
var search$4 = {
	placeholder: "جستوجو محصول",
	placeholder_in_category: "... جستجو در {category}",
	no_results_for_query: "هیچ نتیجه‌ای یافت نشد",
	no_results_suggestion: ".برای نتایج بهتر از کلمات کلیدی عمومی‌ تر استفاده کنید",
	view_all_results: "مشاهده همه نتایج",
	new_products: "محصولات جدید",
	no_products_matching: "محصولی مطابق با جستجو یافت نشد",
	no_products_found_matching: "هیچ محصولی مطابق با جستجوی شما یافت نشد",
	no_products_found: "محصولی یافت نشد",
	use_search_bar_above: "می‌توانید از نوار جستجوی بالا برای جستجوی عبارات دیگر استفاده کنید",
	"in": "در",
	reset_search: "تنظیم مجدد جستجو"
};
var filter$4 = {
	all_categories: "همه دسته‌بندی‌ها",
	newest: "جدیدترین",
	price_low_high: "قیمت: کم به زیاد",
	price_high_low: "قیمت: زیاد به کم"
};
var checkout$4 = {
	title: "تسویه حساب",
	form: {
		first_name: "نام",
		last_name: "نام خانوادگی",
		email: "ایمیل",
		phone: "شماره تماس",
		city: "شهر",
		postcode: "کد پستی (اختیاری)",
		address: "آدرس دقیق"
	},
	pay: {
		description: "پرداخت مبلغ {total} برای {items} کالا",
		btn: "پرداخت {total}",
		secure: "پرداخت شما توسط {method} ایمن شده است",
		success: "! پرداخت با موفقیت انجام شد",
		processed: "از خرید شما سپاسگزاریم! سفارش شما در حال پردازش است.",
		total: "جمع کل",
		order_number: "شماره سفارش",
		date: "تاریخ",
		payment_method: "روش پرداخت",
		verify_failed: "پرداخت تأیید نشد. در صورت کسر وجه با پشتیبانی تماس بگیرید.",
		failed_title: "پرداخت انجام نشد",
		failed_description: "پرداخت لغو شد یا با خطا مواجه شد. می‌توانید دوباره تلاش کنید.",
		back_to_shop: "بازگشت به فروشگاه",
		error: "ثبت سفارش با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
		retry: "تلاش مجدد برای پرداخت"
	}
};
var product$4 = {
	originally: "قیمت اصلی",
	size: "سایز",
	quantity: "تعداد",
	brand: "برند محصول",
	vat_included: "شامل مالیات بر ارزش افزوده",
	featured_information: "اطلاعات محصول",
	free_return: "ضمانت بازگشت ۱۵ روزه. برای اطلاعات بیشتر کلیک کنید",
	information: "اطلاعات",
	shop_similar: "مشاهده محصولات مشابه"
};
var cart$4 = {
	empty: "سبد خرید شما خالی است",
	notting_added: "هنوز محصولی به سبد خرید خود اضافه نکرده‌اید",
	add_to_cart: "افزودن به سبد خرید",
	added_to_cart: "به سبد خرید اضافه شد"
};
var favorites$4 = {
	nothing_to_show_yet: "هنوز محصولی اضافه نکرده اید",
	wishlist_lives_here: ".لیست علاقه‌مندی‌های شما اینجا قرار می‌گیرد"
};
const faIR = {
	general: general$4,
	theme: theme$4,
	nav: nav$4,
	footer: footer$4,
	home: home$4,
	search: search$4,
	filter: filter$4,
	checkout: checkout$4,
	product: product$4,
	cart: cart$4,
	favorites: favorites$4
};

const faIR$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  cart: cart$4,
  checkout: checkout$4,
  default: faIR,
  favorites: favorites$4,
  filter: filter$4,
  footer: footer$4,
  general: general$4,
  home: home$4,
  nav: nav$4,
  product: product$4,
  search: search$4,
  theme: theme$4
}, Symbol.toStringTag, { value: 'Module' }));

var general$3 = {
	go_back: "Go Back",
	loading: "Loading..."
};
var theme$3 = {
	dark: "Dark",
	light: "Light",
	system: "System",
	toggle: "Toggle theme"
};
var nav$3 = {
	home: "Home",
	shop: "Shop",
	categories: "Categories",
	favorites: "Favorites",
	products: "Products"
};
var footer$3 = {
	developed_by_author: "by {author}",
	change_language: "Change language",
	about: "Your online shop for baby essentials and nursery care, with secure checkout and fast delivery.",
	quick_links: "Quick links",
	customer_service: "Customer service",
	trust_title: "Shop with confidence",
	trust_text: "Secure payment and protected data",
	copyright: "© {year} {name} — All rights reserved."
};
var home$3 = {
	seo: {
		title: "{name} | Baby & Nursery Essentials",
		description: "Shop the latest and best baby and nursery products at great prices with fast delivery."
	},
	hero: {
		badge: "Everything for your baby",
		title: "The best baby essentials for you and your little one",
		subtitle: "A complete range of quality products, with guaranteed authenticity and fast nationwide delivery.",
		cta_primary: "Start shopping",
		cta_secondary: "Browse categories",
		stats: {
			customers: "10,000+ happy orders",
			authentic: "Authenticity guaranteed",
			delivery: "Fast nationwide delivery"
		}
	},
	benefits: {
		shipping: {
			title: "Fast delivery",
			description: "Shipped nationwide"
		},
		secure: {
			title: "Secure payment",
			description: "Trusted payment gateway"
		},
		returns: {
			title: "Easy returns",
			description: "7-day return guarantee"
		},
		support: {
			title: "Support",
			description: "Available every day"
		}
	},
	sections: {
		categories: "Categories",
		featured: "Featured products",
		new_arrivals: "New arrivals",
		on_sale: "On sale"
	},
	view_all: "View all",
	promo: {
		title: "Special baby essentials sale",
		subtitle: "Don't miss the best chance to shop with amazing discounts.",
		cta: "View deals"
	},
	newsletter: {
		title: "Stay in the loop",
		subtitle: "Enter your email and we'll send you the latest products and deals.",
		placeholder: "Your email",
		cta: "Subscribe",
		invalid: "Please enter a valid email",
		success: "Successfully subscribed!",
		error: "Something went wrong. Please try again."
	}
};
var search$3 = {
	placeholder: "Search...",
	placeholder_in_category: "Search in {category}...",
	no_results_for_query: "No results for {query}",
	no_results_suggestion: "Try improving your results by double checking your spelling, or trying a more general keyword.",
	view_all_results: "View all results",
	new_products: "New Products",
	no_products_matching: " No products matching",
	no_products_found_matching: "No products found matching",
	no_products_found: "No products found",
	use_search_bar_above: "You can use the search bar above to try searching with different terms.",
	"in": "in",
	reset_search: "Reset Search"
};
var filter$3 = {
	all_categories: "All Categories",
	newest: "Newest",
	price_low_high: "Price: Low to High",
	price_high_low: "Price: High to Low"
};
var checkout$3 = {
	title: "Checkout",
	form: {
		first_name: "First Name",
		last_name: "Last Name",
		email: "Email",
		phone: "Phone",
		city: "City",
		postcode: "Postal code (optional)",
		address: "Address"
	},
	pay: {
		description: "Paying a total of {total} for {items} items",
		btn: "Pay {total}",
		secure: "your payment is secured by {method}",
		success: "Payment successful!",
		processed: "Thank you for your purchase! Your order is being processed.",
		total: "Total",
		order_number: "Order Number",
		date: "Date",
		payment_method: "Payment Method",
		verify_failed: "Payment could not be verified. If you were charged, please contact support.",
		failed_title: "Payment failed",
		failed_description: "Payment was cancelled or encountered an error. You can try again.",
		back_to_shop: "Back to shop",
		error: "Could not place your order. Please try again.",
		retry: "Retry payment"
	}
};
var product$3 = {
	originally: "Originally",
	size: "Size",
	quantity: "Quantity",
	sku: "article number",
	vat_included: "VAT included",
	featured_information: "Featured Information",
	free_return: "Free returns within 15 days. Click for detailed",
	information: "Information",
	shop_similar: "Shop similar"
};
var cart$3 = {
	empty: "Your cart is empty",
	notting_added: "You haven't added any items to your cart yet.",
	add_to_cart: "Add to cart",
	added_to_cart: "Added to cart"
};
var favorites$3 = {
	nothing_to_show_yet: "Nothing to show... yet!",
	wishlist_lives_here: "Wishlist you create will live here. These are a few of your favorite things..."
};
const enGB = {
	general: general$3,
	theme: theme$3,
	nav: nav$3,
	footer: footer$3,
	home: home$3,
	search: search$3,
	filter: filter$3,
	checkout: checkout$3,
	product: product$3,
	cart: cart$3,
	favorites: favorites$3
};

const enGB$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  cart: cart$3,
  checkout: checkout$3,
  default: enGB,
  favorites: favorites$3,
  filter: filter$3,
  footer: footer$3,
  general: general$3,
  home: home$3,
  nav: nav$3,
  product: product$3,
  search: search$3,
  theme: theme$3
}, Symbol.toStringTag, { value: 'Module' }));

var general$2 = {
	go_back: "Gå tilbake",
	loading: "Laster..."
};
var theme$2 = {
	dark: "Mørk",
	light: "Lys",
	system: "System",
	toggle: "Bytt tema"
};
var nav$2 = {
	home: "Hjem",
	shop: "Butikk",
	categories: "Kategorier",
	favorites: "Favoritter",
	products: "Produkter"
};
var footer$2 = {
	developed_by_author: "av {author}",
	change_language: "Endre språk",
	about: "Din nettbutikk for babyutstyr og barnepleie, med sikker betaling og rask levering.",
	quick_links: "Hurtiglenker",
	customer_service: "Kundeservice",
	trust_title: "Handle trygt",
	trust_text: "Sikker betaling og beskyttede data",
	copyright: "© {year} {name} — Alle rettigheter forbeholdt."
};
var home$2 = {
	seo: {
		title: "{name} | Baby- og barneutstyr",
		description: "Kjøp de nyeste og beste baby- og barneproduktene til gode priser med rask levering."
	},
	hero: {
		badge: "Alt til babyen din",
		title: "Det beste babyutstyret for deg og den lille",
		subtitle: "Et komplett utvalg av kvalitetsprodukter, med garantert ekthet og rask levering.",
		cta_primary: "Begynn å handle",
		cta_secondary: "Se kategorier",
		stats: {
			customers: "10 000+ fornøyde ordrer",
			authentic: "Garantert ekthet",
			delivery: "Rask levering i hele landet"
		}
	},
	benefits: {
		shipping: {
			title: "Rask levering",
			description: "Sendes over hele landet"
		},
		secure: {
			title: "Sikker betaling",
			description: "Pålitelig betalingsløsning"
		},
		returns: {
			title: "Enkel retur",
			description: "7 dagers returgaranti"
		},
		support: {
			title: "Kundestøtte",
			description: "Tilgjengelig hver dag"
		}
	},
	sections: {
		categories: "Kategorier",
		featured: "Utvalgte produkter",
		new_arrivals: "Nye produkter",
		on_sale: "På salg"
	},
	view_all: "Se alle",
	promo: {
		title: "Spesialsalg på babyutstyr",
		subtitle: "Ikke gå glipp av den beste muligheten til å handle med fantastiske rabatter.",
		cta: "Se tilbud"
	},
	newsletter: {
		title: "Hold deg oppdatert",
		subtitle: "Skriv inn e-posten din, så sender vi deg de nyeste produktene og tilbudene.",
		placeholder: "Din e-post",
		cta: "Abonner",
		invalid: "Vennligst skriv inn en gyldig e-post",
		success: "Abonnementet er registrert!",
		error: "Noe gikk galt. Prøv igjen."
	}
};
var search$2 = {
	placeholder: "Søk...",
	placeholder_in_category: "Søk i {category}...",
	no_results_for_query: "Ingen resultater for {query}",
	no_results_suggestion: "Prøv å forbedre resultatene dine ved å dobbeltsjekke stavemåten, eller prøv et mer generelt nøkkelord.",
	view_all_results: "Vis alle resultater",
	new_products: "Nye Produkter",
	no_products_matching: "Ingen produkter samsvarer",
	no_products_found_matching: "Ingen produkter funnet som samsvarer",
	no_products_found: "Ingen produkter funnet",
	use_search_bar_above: "Du kan bruke søkefeltet ovenfor for å prøve å søke med andre termer.",
	"in": "i",
	reset_search: "Tilbakestill søk"
};
var filter$2 = {
	all_categories: "Alle Kategorier",
	newest: "Nyeste",
	price_low_high: "Pris: Lav til Høy",
	price_high_low: "Pris: Høy til Lav"
};
var checkout$2 = {
	title: "Kasse",
	form: {
		first_name: "Fornavn",
		last_name: "Etternavn",
		email: "E-post",
		phone: "Telefon",
		city: "By",
		postcode: "Postnummer (valgfritt)",
		address: "Adresse"
	},
	pay: {
		description: "Betaler totalt {total} for {items} varer",
		btn: "Betal {total}",
		secure: "Din betaling er sikret av {method}",
		success: "Betaling vellykket!",
		processed: "Takk for ditt kjøp! Din bestilling blir behandlet.",
		total: "Totalt",
		order_number: "Ordrenummer",
		date: "Dato",
		payment_method: "Betalingsmetode",
		verify_failed: "Betalingen kunne ikke verifiseres. Kontakt support hvis du ble belastet.",
		failed_title: "Betaling mislyktes",
		failed_description: "Betalingen ble avbrutt eller mislyktes. Du kan prøve igjen.",
		back_to_shop: "Tilbake til butikken",
		error: "Kunne ikke fullføre bestillingen. Prøv igjen.",
		retry: "Prøv betaling på nytt"
	}
};
var product$2 = {
	originally: "Opprinnelig",
	size: "Størrelse",
	quantity: "Antall",
	sku: "artikkelnummer",
	vat_included: "MVA inkludert",
	featured_information: "Fremhevet Informasjon",
	free_return: "Gratis retur innen 15 dager. Klikk for mer informasjon.",
	information: "Informasjon",
	shop_similar: "Sammenlign lignende produkter"
};
var cart$2 = {
	empty: "Handlekurven din er tom",
	notting_added: "Du har ikke lagt til noen varer i handlekurven ennå.",
	add_to_cart: "Legg i handlekurv",
	added_to_cart: "Lagt til i handlekurven"
};
var favorites$2 = {
	nothing_to_show_yet: "Ingenting å vise... ennå!",
	wishlist_lives_here: "Ønskelister du lager vil vises her. Dette er noen av dine favoritt-ting..."
};
const nbNO = {
	general: general$2,
	theme: theme$2,
	nav: nav$2,
	footer: footer$2,
	home: home$2,
	search: search$2,
	filter: filter$2,
	checkout: checkout$2,
	product: product$2,
	cart: cart$2,
	favorites: favorites$2
};

const nbNO$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  cart: cart$2,
  checkout: checkout$2,
  default: nbNO,
  favorites: favorites$2,
  filter: filter$2,
  footer: footer$2,
  general: general$2,
  home: home$2,
  nav: nav$2,
  product: product$2,
  search: search$2,
  theme: theme$2
}, Symbol.toStringTag, { value: 'Module' }));

var general$1 = {
	go_back: "Ga terug",
	loading: "Laden..."
};
var theme$1 = {
	dark: "Donker",
	light: "Licht",
	system: "Systeem",
	toggle: "Thema wisselen"
};
var nav$1 = {
	home: "Home",
	shop: "Winkel",
	categories: "Categorieën",
	favorites: "Favorieten",
	products: "Producten"
};
var footer$1 = {
	developed_by_author: "door {author}",
	change_language: "Taal wijzigen",
	about: "Jouw online winkel voor babyspullen en babyverzorging, met veilig betalen en snelle levering.",
	quick_links: "Snelle links",
	customer_service: "Klantenservice",
	trust_title: "Veilig winkelen",
	trust_text: "Veilig betalen en beschermde gegevens",
	copyright: "© {year} {name} — Alle rechten voorbehouden."
};
var home$1 = {
	seo: {
		title: "{name} | Baby- en babykamerbenodigdheden",
		description: "Koop de nieuwste en beste baby- en babykamerproducten tegen scherpe prijzen met snelle levering."
	},
	hero: {
		badge: "Alles voor je baby",
		title: "De beste babyspullen voor jou en je kleintje",
		subtitle: "Een compleet assortiment kwaliteitsproducten, met gegarandeerde echtheid en snelle levering.",
		cta_primary: "Begin met winkelen",
		cta_secondary: "Bekijk categorieën",
		stats: {
			customers: "10.000+ tevreden bestellingen",
			authentic: "Echtheid gegarandeerd",
			delivery: "Snelle landelijke levering"
		}
	},
	benefits: {
		shipping: {
			title: "Snelle levering",
			description: "Landelijk verzonden"
		},
		secure: {
			title: "Veilig betalen",
			description: "Vertrouwde betaalmethode"
		},
		returns: {
			title: "Eenvoudig retourneren",
			description: "7 dagen retourgarantie"
		},
		support: {
			title: "Ondersteuning",
			description: "Elke dag bereikbaar"
		}
	},
	sections: {
		categories: "Categorieën",
		featured: "Uitgelichte producten",
		new_arrivals: "Nieuwe producten",
		on_sale: "In de aanbieding"
	},
	view_all: "Bekijk alles",
	promo: {
		title: "Speciale uitverkoop babyspullen",
		subtitle: "Mis de beste kans niet om te winkelen met geweldige kortingen.",
		cta: "Bekijk aanbiedingen"
	},
	newsletter: {
		title: "Blijf op de hoogte",
		subtitle: "Vul je e-mailadres in en we sturen je de nieuwste producten en aanbiedingen.",
		placeholder: "Je e-mailadres",
		cta: "Abonneren",
		invalid: "Voer een geldig e-mailadres in",
		success: "Succesvol geabonneerd!",
		error: "Er ging iets mis. Probeer het opnieuw."
	}
};
var search$1 = {
	placeholder: "Zoeken...",
	placeholder_in_category: "Zoeken in {category}...",
	no_results_for_query: "Geen resultaten voor {query}",
	no_results_suggestion: "Controleer de spelling of probeer een algemener trefwoord om je resultaten te verbeteren.",
	view_all_results: "Bekijk alle resultaten",
	new_products: "Nieuwe Producten",
	no_products_matching: "Geen overeenkomende producten",
	no_products_found_matching: "Geen producten gevonden die overeenkomen",
	no_products_found: "Geen producten gevonden",
	use_search_bar_above: "Gebruik de zoekbalk hierboven om met andere termen te zoeken.",
	"in": "in",
	reset_search: "Zoekopdracht resetten"
};
var filter$1 = {
	all_categories: "Alle Categorieën",
	newest: "Nieuwste",
	price_low_high: "Prijs: Laag naar Hoog",
	price_high_low: "Prijs: Hoog naar Laag"
};
var checkout$1 = {
	title: "Afrekenen",
	form: {
		first_name: "Voornaam",
		last_name: "Achternaam",
		email: "E-mail",
		phone: "Telefoon",
		city: "Stad",
		postcode: "Postcode (optioneel)",
		address: "Adres"
	},
	pay: {
		description: "U betaalt een totaal van {total} voor {items} artikelen",
		btn: "Betaal {total}",
		secure: "Uw betaling is beveiligd door {method}",
		success: "Betaling succesvol!",
		processed: "Bedankt voor uw aankoop! Uw bestelling wordt verwerkt.",
		total: "Totaal",
		order_number: "Bestelnummer",
		date: "Datum",
		payment_method: "Betaalmethode",
		verify_failed: "Betaling kon niet worden geverifieerd. Neem contact op met support als u bent belast.",
		failed_title: "Betaling mislukt",
		failed_description: "Betaling is geannuleerd of mislukt. U kunt het opnieuw proberen.",
		back_to_shop: "Terug naar winkel",
		error: "Bestelling kon niet worden geplaatst. Probeer het opnieuw.",
		retry: "Betaling opnieuw proberen"
	}
};
var product$1 = {
	originally: "Oorspronkelijk",
	size: "Maat",
	quantity: "Aantal",
	sku: "artikelnummer",
	vat_included: "Inclusief BTW",
	featured_information: "Uitgelichte Informatie",
	free_return: "Gratis retourneren binnen 15 dagen. Klik voor meer informatie.",
	information: "Information",
	shop_similar: "Shop vergelijkbaar"
};
var cart$1 = {
	empty: "Je winkelwagen is leeg",
	notting_added: "Je hebt nog geen artikelen aan je winkelwagen toegevoegd.",
	add_to_cart: "Toevoegen aan winkelwagen",
	added_to_cart: "Toegevoegd aan winkelwagen"
};
var favorites$1 = {
	nothing_to_show_yet: "Nog niets te zien... nog niet!",
	wishlist_lives_here: "De verlanglijst die je maakt, komt hier te staan. Dit zijn een paar van je favoriete dingen..."
};
const nlNL = {
	general: general$1,
	theme: theme$1,
	nav: nav$1,
	footer: footer$1,
	home: home$1,
	search: search$1,
	filter: filter$1,
	checkout: checkout$1,
	product: product$1,
	cart: cart$1,
	favorites: favorites$1
};

const nlNL$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  cart: cart$1,
  checkout: checkout$1,
  default: nlNL,
  favorites: favorites$1,
  filter: filter$1,
  footer: footer$1,
  general: general$1,
  home: home$1,
  nav: nav$1,
  product: product$1,
  search: search$1,
  theme: theme$1
}, Symbol.toStringTag, { value: 'Module' }));

var general = {
	go_back: "Zurück",
	loading: "Laden..."
};
var theme = {
	dark: "Dunkel",
	light: "Hell",
	system: "System",
	toggle: "Thema wechseln"
};
var nav = {
	home: "Startseite",
	shop: "Shop",
	categories: "Kategorien",
	favorites: "Favoriten",
	products: "Produkte"
};
var footer = {
	developed_by_author: "von {author}",
	change_language: "Sprache ändern",
	about: "Dein Onlineshop für Babyausstattung und Babypflege, mit sicherer Bezahlung und schneller Lieferung.",
	quick_links: "Schnelllinks",
	customer_service: "Kundenservice",
	trust_title: "Sicher einkaufen",
	trust_text: "Sichere Bezahlung und geschützte Daten",
	copyright: "© {year} {name} — Alle Rechte vorbehalten."
};
var home = {
	seo: {
		title: "{name} | Baby- und Erstausstattung",
		description: "Kaufe die neuesten und besten Baby- und Erstausstattungsprodukte zu günstigen Preisen mit schneller Lieferung."
	},
	hero: {
		badge: "Alles für dein Baby",
		title: "Die beste Babyausstattung für dich und dein Kleines",
		subtitle: "Ein komplettes Sortiment an Qualitätsprodukten, mit garantierter Echtheit und schneller Lieferung.",
		cta_primary: "Jetzt einkaufen",
		cta_secondary: "Kategorien ansehen",
		stats: {
			customers: "10.000+ zufriedene Bestellungen",
			authentic: "Echtheit garantiert",
			delivery: "Schnelle landesweite Lieferung"
		}
	},
	benefits: {
		shipping: {
			title: "Schnelle Lieferung",
			description: "Landesweiter Versand"
		},
		secure: {
			title: "Sichere Bezahlung",
			description: "Vertrauenswürdiges Zahlungsgateway"
		},
		returns: {
			title: "Einfache Rückgabe",
			description: "7 Tage Rückgabegarantie"
		},
		support: {
			title: "Support",
			description: "Täglich erreichbar"
		}
	},
	sections: {
		categories: "Kategorien",
		featured: "Empfohlene Produkte",
		new_arrivals: "Neuheiten",
		on_sale: "Im Angebot"
	},
	view_all: "Alle ansehen",
	promo: {
		title: "Spezieller Babyausstattungs-Sale",
		subtitle: "Verpasse nicht die beste Gelegenheit, mit tollen Rabatten einzukaufen.",
		cta: "Angebote ansehen"
	},
	newsletter: {
		title: "Bleib auf dem Laufenden",
		subtitle: "Gib deine E-Mail-Adresse ein und wir senden dir die neuesten Produkte und Angebote.",
		placeholder: "Deine E-Mail",
		cta: "Abonnieren",
		invalid: "Bitte gib eine gültige E-Mail-Adresse ein",
		success: "Erfolgreich abonniert!",
		error: "Etwas ist schiefgelaufen. Bitte versuche es erneut."
	}
};
var search = {
	placeholder: "Suchen...",
	placeholder_in_category: "In {category} suchen...",
	no_results_for_query: "Keine Ergebnisse für {query}",
	no_results_suggestion: "Verbessern Sie Ihre Ergebnisse, indem Sie die Rechtschreibung überprüfen oder ein allgemeineres Stichwort verwenden.",
	view_all_results: "Alle Ergebnisse anzeigen",
	new_products: "Neue Produkte",
	no_products_matching: "Keine passenden Produkte",
	no_products_found_matching: "Keine passenden Produkte gefunden",
	no_products_found: "Keine Produkte gefunden",
	use_search_bar_above: "Sie können die Suchleiste oben verwenden, um mit anderen Begriffen zu suchen.",
	"in": "in",
	reset_search: "Suche zurücksetzen"
};
var filter = {
	all_categories: "Alle Kategorien",
	newest: "Neueste",
	price_low_high: "Preis: Niedrig bis Hoch",
	price_high_low: "Preis: Hoch bis Niedrig"
};
var checkout = {
	title: "Kasse",
	form: {
		first_name: "Vorname",
		last_name: "Nachname",
		email: "E-Mail",
		phone: "Telefon",
		city: "Stadt",
		postcode: "Postleitzahl (optional)",
		address: "Adresse"
	},
	pay: {
		description: "Gesamtzahlung von {total} für {items} Artikel",
		btn: "{total} bezahlen",
		secure: "Ihre Zahlung ist durch {method} gesichert",
		success: "Zahlung erfolgreich!",
		processed: "Vielen Dank für Ihren Einkauf! Ihre Bestellung wird bearbeitet.",
		total: "Gesamt",
		order_number: "Bestellnummer",
		date: "Datum",
		payment_method: "Zahlungsmethode",
		verify_failed: "Zahlung konnte nicht verifiziert werden. Bei Abbuchung bitte Support kontaktieren.",
		failed_title: "Zahlung fehlgeschlagen",
		failed_description: "Zahlung wurde abgebrochen oder ist fehlgeschlagen. Sie können es erneut versuchen.",
		back_to_shop: "Zurück zum Shop",
		error: "Bestellung konnte nicht aufgegeben werden. Bitte versuchen Sie es erneut.",
		retry: "Zahlung erneut versuchen"
	}
};
var product = {
	originally: "Ursprünglich",
	size: "Größe",
	quantity: "Menge",
	sku: "Artikelnummer",
	vat_included: "MwSt. inbegriffen",
	featured_information: "Ausgewählte Informationen",
	free_return: "Kostenlose Rücksendung innerhalb von 15 Tagen. Klicken Sie hier für weitere Informationen.",
	information: "Informationen",
	shop_similar: "Ähnliche Artikel kaufen"
};
var cart = {
	empty: "Ihr Warenkorb ist leer",
	notting_added: "Sie haben noch keine Artikel in Ihren Warenkorb gelegt.",
	add_to_cart: "In den Warenkorb",
	added_to_cart: "Zum Warenkorb hinzugefügt"
};
var favorites = {
	nothing_to_show_yet: "Noch nichts zu sehen... noch nicht!",
	wishlist_lives_here: "Wunschlisten, die Sie erstellen, werden hier angezeigt. Das sind einige Ihrer Lieblingssachen..."
};
const deDE = {
	general: general,
	theme: theme,
	nav: nav,
	footer: footer,
	home: home,
	search: search,
	filter: filter,
	checkout: checkout,
	product: product,
	cart: cart,
	favorites: favorites
};

const deDE$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  cart: cart,
  checkout: checkout,
  default: deDE,
  favorites: favorites,
  filter: filter,
  footer: footer,
  general: general,
  home: home,
  nav: nav,
  product: product,
  search: search,
  theme: theme
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const addToCartMutation = gql`
	mutation addToCart($input: AddToCartInput!) {
		addToCart(input: $input) {
			cartItem {
				key
				quantity
				product {
					node {
						sku
						slug
						name
					}
				}
				variation {
					node {
						name
						databaseId
						salePrice(format: RAW)
						regularPrice(format: RAW)
						stockQuantity
						stockStatus
						image {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
					attributes {
						value
					}
				}
			}
		}
	}
`;

const add_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await requestMutation(event, addToCartMutation, { input: body });
});

const add_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: add_post
}, Symbol.toStringTag, { value: 'Module' }));

const updateItemQuantitiesMutation = gql`
  mutation updateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
      }
    }
  }
`;

const update_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await requestMutation(event, updateItemQuantitiesMutation, { input: body });
});

const update_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: update_post
}, Symbol.toStringTag, { value: 'Module' }));

const getCategoriesQuery = gql`
	query getCategories {
		productCategories(first: 100, where: { orderby: COUNT, order: DESC }) {
			nodes {
				id
				name
				image {
					sourceUrl
				}
				products(where: { stockStatus: IN_STOCK }, first: 1) {
					nodes {
						id
					}
				}
				children(first: 100, where: { orderby: COUNT, order: DESC }) {
					nodes {
						name
						image {
							sourceUrl
						}
						products(where: { stockStatus: IN_STOCK }, first: 1) {
							nodes {
								id
							}
						}
						children(first: 100, where: { orderby: COUNT, order: DESC }) {
							nodes {
								name
								image {
									sourceUrl
								}
								products(where: { stockStatus: IN_STOCK }, first: 1) {
									nodes {
										id
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const categories_get = cachedEventHandler(async () => {
  return await requestQuery(getCategoriesQuery);
});

const categories_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: categories_get
}, Symbol.toStringTag, { value: 'Module' }));

const checkoutMutation = gql`
	mutation Checkout($input: CheckoutInput!) {
		checkout(input: $input) {
			order {
				databaseId
				orderKey
				orderNumber
				total
				status
				date
				paymentMethodTitle
			}
		}
	}
`;

const checkout_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await requestMutation(event, checkoutMutation, { input: body });
});

const checkout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: checkout_post
}, Symbol.toStringTag, { value: 'Module' }));

const bodySchema = z.object({
  email: z.string().email()
});
const newsletter_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = bodySchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid email address"
    });
  }
  return { ok: true };
});

const newsletter_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: newsletter_post
}, Symbol.toStringTag, { value: 'Module' }));

const verify_get = defineEventHandler(async (event) => {
  const { order_id, key } = getQuery$1(event);
  if (!order_id || !key) {
    throw createError({
      statusCode: 400,
      message: "Missing order_id or key"
    });
  }
  const orderId = Number(order_id);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      message: "Invalid order_id"
    });
  }
  const config = useRuntimeConfig();
  const wpBase = config.public.wpBaseUrl.replace(/\/$/, "");
  if (!wpBase || !config.wcConsumerKey || !config.wcConsumerSecret) {
    throw createError({
      statusCode: 500,
      message: "Payment verification is not configured"
    });
  }
  const auth = Buffer.from(
    `${config.wcConsumerKey}:${config.wcConsumerSecret}`
  ).toString("base64");
  let order;
  try {
    order = await $fetch(
      `${wpBase}/wp-json/wc/v3/orders/${orderId}`,
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );
  } catch {
    throw createError({
      statusCode: 404,
      message: "Order not found"
    });
  }
  if (order.order_key !== key) {
    throw createError({ statusCode: 403, message: "Invalid order key" });
  }
  const paidStatuses = ["processing", "completed"];
  if (!paidStatuses.includes(order.status)) {
    throw createError({
      statusCode: 402,
      message: "Payment not completed"
    });
  }
  return {
    orderNumber: order.number,
    total: order.total,
    status: order.status,
    paymentMethodTitle: order.payment_method_title,
    date: order.date_created
  };
});

const verify_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: verify_get
}, Symbol.toStringTag, { value: 'Module' }));

const getProductQuery = gql`
	query getProduct($sku: ID!) {
		product(id: $sku, idType: SKU) {
			... on VariableProduct {
				databaseId
				sku
				slug
				name
				regularPrice
				productCategories {
					nodes {
						name
					}
				}
				salePrice
				description

				image {
					sourceUrl(size: LARGE)
				}

				galleryImages {
					nodes {
						sourceUrl(size: LARGE)
					}
				}

				variations(where: { orderby: { field: NAME, order: DESC } }) {
					nodes {
						databaseId
						stockStatus
						stockQuantity
						attributes {
							nodes {
								name
								value
							}
						}
					}
				}

				related(first: 50) {
					nodes {
						... on VariableProduct {
							sku
							slug
							name
							regularPrice
							salePrice
							image {
								sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
							}
							galleryImages {
								nodes {
									sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
								}
							}
						}
					}
				}
			}
		}
	}
`;

const product_get = cachedEventHandler(
  async (event) => {
    const { slug, sku } = getQuery$1(event);
    return await requestQuery(getProductQuery, { slug, sku });
  },
  {
    maxAge: 60 * 5,
    swr: true,
    getKey: (event) => event.req.url
  }
);

const product_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: product_get
}, Symbol.toStringTag, { value: 'Module' }));

const getProductsQuery = gql`
	query getProducts(
		$after: String
		$first: Int = 21
		$search: String
		$category: String
		$onSale: Boolean
		$featured: Boolean
		$order: OrderEnum = DESC
		$field: ProductsOrderByEnum = DATE
	) {
		products(
			first: $first
			after: $after
			where: {
				stockStatus: IN_STOCK
				search: $search
				category: $category
				onSale: $onSale
				featured: $featured
				orderby: { field: $field, order: $order }
			}
		) {
			nodes {
				id
				__typename
				sku
				slug
				name

				# بخش اصلاح شده که در تست جواب داد
				... on Product {
					productCategories {
						nodes {
							name
							slug
						}
					}
				}

				image {
					sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
				}

				... on VariableProduct {
					regularPrice
					salePrice
					galleryImages {
						nodes {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
				}

				... on SimpleProduct {
					regularPrice
					salePrice
					galleryImages {
						nodes {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;

const products_get = cachedEventHandler(
  async (event) => {
    var _a, _b;
    const query = getQuery$1(event);
    const toBool = (value) => value === "true" || value === "1" ? true : null;
    const variables = {
      after: query.after ? String(query.after) : null,
      first: query.first ? Number(query.first) : 21,
      search: query.search ? String(query.search) : null,
      category: query.category ? decodeURIComponent(String(query.category)) : null,
      onSale: toBool(query.onSale),
      featured: toBool(query.featured),
      order: ((_a = query.orderby) == null ? void 0 : _a.toUpperCase()) || "DESC",
      field: ((_b = query.fieldby) == null ? void 0 : _b.toUpperCase()) || "DATE"
    };
    try {
      return await requestQuery(getProductsQuery, variables);
    } catch (error) {
      console.error("\u062E\u0637\u0627 \u062F\u0631 \u0627\u062C\u0631\u0627\u06CC \u06A9\u0648\u0626\u0631\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A:", error);
      throw createError({
        statusCode: 500,
        message: "Server GraphQL Error"
      });
    }
  },
  {
    maxAge: 60,
    swr: true,
    getKey: (event) => event.node.req.url || "products"
  }
);

const products_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: products_get
}, Symbol.toStringTag, { value: 'Module' }));

const getSearchProductsQuery = gql`
  query getSearchProducts($search: String) {
    products(first: 6, where: { stockStatus: IN_STOCK, search: $search }) {
      nodes {
        ... on VariableProduct {
          sku
          slug
          name
          regularPrice
          salePrice
          image {
            sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          }
          galleryImages {
            nodes {
              sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            }
          }
        }
      }
    }
  }
`;

const search_get = cachedEventHandler(
  async (event) => {
    const { search = "" } = getQuery$1(event);
    return await requestQuery(getSearchProductsQuery, { search });
  },
  {
    maxAge: 60,
    swr: true,
    getKey: (event) => event.req.url
  }
);

const search_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: search_get
}, Symbol.toStringTag, { value: 'Module' }));

const featureMessages = {
  ai: [
    "NuxtHub AI is not enabled, set `hub.ai = true` in your `nuxt.config.ts`"
  ].join("\n"),
  analytics: [
    "NuxtHub Analytics is not enabled, set `hub.analytics = true` in your `nuxt.config.ts`"
  ].join("\n"),
  blob: [
    "NuxtHub Blob is not enabled, set `hub.blob = true` in your `nuxt.config.ts`",
    "Read more at `https://hub.nuxt.com/docs/features/blob`"
  ].join("\n"),
  cache: [
    "NuxtHub Cache is not enabled, set `hub.cache = true` in your `nuxt.config.ts`"
  ].join("\n"),
  database: [
    "NuxtHub Database is not enabled, set `hub.database = true` in your `nuxt.config.ts`",
    "Read more at `https://hub.nuxt.com/docs/features/database`"
  ].join("\n"),
  kv: [
    "NuxtHub KV is not enabled, set `hub.kv = true` in your `nuxt.config.ts`",
    "Read more at `https://hub.nuxt.com/docs/features/kv`"
  ].join("\n"),
  vectorize: [
    "NuxtHub Vectorize is not enabled, refer to the documentation.",
    "Read more at `https://hub.nuxt.com/docs/features/vectorize`"
  ].join("\n")
};
function requireNuxtHubFeature(feature) {
  const hub = useRuntimeConfig().hub;
  if (!hub[feature]) {
    {
      console.error(featureMessages[feature]);
    }
    throw createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      message: featureMessages[feature]
    });
  }
  if (hub.remote && !hub.remoteManifest?.features?.[feature] && !hub.remoteManifest?.storage?.[feature]) {
    const message = `NuxtHub \`${feature}\` is not enabled in the remote project. Deploy a new version with \`${feature}\` enabled and try again.
Read more at \`https://hub.nuxt.com/docs/getting-started/remote-storage\``;
    {
      console.error(message);
    }
    throw createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      message
    });
  }
}

const ____feature_ = eventHandler((event) => {
  const [feature] = (event.context.params?.feature || "").split("/");
  requireNuxtHubFeature(feature);
  throw createError({
    statusCode: 404,
    message: `Not found`
  });
});

const ____feature_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____feature_
}, Symbol.toStringTag, { value: 'Module' }));

async function requireNuxtHubAuthorization(event) {
  {
    return;
  }
}

const index_head = eventHandler(async (event) => {
  await requireNuxtHubAuthorization();
  return sendNoContent(event);
});

const index_head$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_head
}, Symbol.toStringTag, { value: 'Module' }));

function getCloudflareAccessHeaders(access) {
  const isCloudflareAccessEnabled = !!(access?.clientId && access?.clientSecret);
  if (!isCloudflareAccessEnabled) return {};
  return {
    "CF-Access-Client-Id": access?.clientId,
    "CF-Access-Client-Secret": access?.clientSecret
  };
}

let _db;
function hubDatabase() {
  requireNuxtHubFeature("database");
  if (_db) {
    return _db;
  }
  const hub = useRuntimeConfig().hub;
  const binding = process.env.DB || globalThis.__env__?.DB || globalThis.DB;
  if (hub.remote && hub.projectUrl && !binding) {
    const cfAccessHeaders = getCloudflareAccessHeaders(hub.cloudflareAccess);
    _db = proxyHubDatabase(hub.projectUrl, hub.projectSecretKey || hub.userToken, cfAccessHeaders);
    return _db;
  }
  if (binding) {
    _db = binding;
    return _db;
  }
  throw createError("Missing Cloudflare DB binding (D1)");
}
function proxyHubDatabase(projectUrl, secretKey, headers) {
  requireNuxtHubFeature("database");
  const d1API = ofetch.create({
    baseURL: joinURL(projectUrl, "/api/_hub/database"),
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      ...headers
    }
  });
  return {
    async exec(query) {
      return d1API("/exec", {
        body: { query }
      }).catch(handleProxyError$1);
    },
    prepare(query) {
      const stmt = {
        _body: {
          query,
          params: []
        },
        bind(...params) {
          return {
            ...stmt,
            _body: { query, params }
          };
        },
        async all() {
          return d1API("/all", { body: this._body }).catch(handleProxyError$1);
        },
        async raw(options) {
          return d1API("/raw", {
            body: {
              ...this._body,
              ...options
            }
          }).catch(handleProxyError$1);
        },
        async run() {
          return d1API("/run", { body: this._body }).catch(handleProxyError$1);
        },
        async first(colName) {
          return d1API("/first", {
            body: {
              ...this._body,
              colName
            }
          }).catch(handleProxyError$1).then((res) => res || null);
        }
      };
      return stmt;
    },
    batch(statements) {
      return d1API("/batch", {
        // @ts-expect-error _body is not recognized but internally used
        body: statements.map((smtm) => smtm._body)
      });
    }
  };
}
function handleProxyError$1(err) {
  throw createError({
    statusCode: err.statusCode,
    // @ts-expect-error not aware of data property
    message: err.data?.message || err.message
  });
}

let _kv;
function hubKV() {
  requireNuxtHubFeature("kv");
  if (_kv) {
    return _kv;
  }
  const hub = useRuntimeConfig().hub;
  const binding = process.env.KV || globalThis.__env__?.KV || globalThis.KV;
  if (hub.remote && hub.projectUrl && !binding) {
    const cfAccessHeaders = getCloudflareAccessHeaders(hub.cloudflareAccess);
    _kv = proxyHubKV(hub.projectUrl, hub.projectSecretKey || hub.userToken, cfAccessHeaders);
    return _kv;
  }
  if (binding) {
    _kv = createStorage({
      driver: cloudflareKVBindingDriver({
        binding
      })
    });
    return _kv;
  }
  throw createError("Missing Cloudflare KV binding (KV)");
}
function proxyHubKV(projectUrl, secretKey, headers) {
  requireNuxtHubFeature("kv");
  const storage = createStorage({
    driver: httpDriver({
      base: joinURL(projectUrl, "/api/_hub/kv/"),
      headers: {
        Authorization: `Bearer ${secretKey}`,
        ...headers
      }
    })
  });
  return storage;
}

async function streamToArrayBuffer(stream, streamSize) {
  const result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result.set(value, bytesRead);
    bytesRead += value.length;
  }
  return result;
}

const _r2_buckets = {};
function getBlobBinding(name = "BLOB") {
  return process.env[name] || globalThis.__env__?.[name] || globalThis[name];
}
function _useBucket(name = "BLOB") {
  if (_r2_buckets[name]) {
    return _r2_buckets[name];
  }
  const binding = getBlobBinding(name);
  if (binding) {
    _r2_buckets[name] = binding;
    return _r2_buckets[name];
  }
  throw createError(`Missing Cloudflare ${name} binding (R2)`);
}
function hubBlob() {
  requireNuxtHubFeature("blob");
  const hub = useRuntimeConfig().hub;
  const binding = getBlobBinding();
  if (hub.remote && hub.projectUrl && !binding) {
    const cfAccessHeaders = getCloudflareAccessHeaders(hub.cloudflareAccess);
    return proxyHubBlob(hub.projectUrl, hub.projectSecretKey || hub.userToken, cfAccessHeaders);
  }
  const bucket = _useBucket();
  const blob = {
    async list(options) {
      const resolvedOptions = defu$1(options, {
        limit: 1e3,
        include: ["httpMetadata", "customMetadata"],
        delimiter: options?.folded ? "/" : void 0
      });
      const listed = await bucket.list(resolvedOptions);
      const hasMore = listed.truncated;
      const cursor = listed.truncated ? listed.cursor : void 0;
      return {
        blobs: listed.objects.map(mapR2ObjectToBlob),
        hasMore,
        cursor,
        folders: resolvedOptions.delimiter ? listed.delimitedPrefixes : void 0
      };
    },
    async serve(event, pathname) {
      pathname = decodeURIComponent(pathname);
      const object = await bucket.get(pathname);
      if (!object) {
        throw createError({ message: "File not found", statusCode: 404 });
      }
      setHeader(event, "Content-Type", object.httpMetadata?.contentType || getContentType(pathname));
      setHeader(event, "Content-Length", object.size);
      setHeader(event, "etag", object.httpEtag);
      return object.body;
    },
    async get(pathname) {
      const object = await bucket.get(decodeURIComponent(pathname));
      if (!object) {
        return null;
      }
      return object.blob();
    },
    async put(pathname, body, options = {}) {
      pathname = decodeURIComponent(pathname);
      const { contentType: optionsContentType, contentLength, addRandomSuffix, prefix, customMetadata } = options;
      const contentType = optionsContentType || body.type || getContentType(pathname);
      const { dir, ext, name: filename } = parse$1(pathname);
      if (addRandomSuffix) {
        pathname = joinURL(dir === "." ? "" : dir, `${filename}-${randomUUID().split("-")[0]}${ext}`);
      } else {
        pathname = joinURL(dir === "." ? "" : dir, `${filename}${ext}`);
      }
      if (prefix) {
        pathname = joinURL(prefix, pathname).replace(/\/+/g, "/").replace(/^\/+/, "");
      }
      const httpMetadata = { contentType };
      if (contentLength) {
        httpMetadata.contentLength = contentLength;
      }
      const object = await bucket.put(pathname, body, { httpMetadata, customMetadata });
      return mapR2ObjectToBlob(object);
    },
    async head(pathname) {
      const object = await bucket.head(decodeURIComponent(pathname));
      if (!object) {
        throw createError({ message: "Blob not found", statusCode: 404 });
      }
      return mapR2ObjectToBlob(object);
    },
    async del(pathnames) {
      if (Array.isArray(pathnames)) {
        return await bucket.delete(pathnames.map((p) => decodeURIComponent(p)));
      } else {
        return await bucket.delete(decodeURIComponent(pathnames));
      }
    },
    async createMultipartUpload(pathname, options = {}) {
      pathname = decodeURIComponent(pathname);
      const { contentType: optionsContentType, contentLength, addRandomSuffix, prefix, customMetadata } = options;
      const contentType = optionsContentType || getContentType(pathname);
      const { dir, ext, name: filename } = parse$1(pathname);
      if (addRandomSuffix) {
        pathname = joinURL(dir === "." ? "" : dir, `${filename}-${randomUUID().split("-")[0]}${ext}`);
      } else {
        pathname = joinURL(dir === "." ? "" : dir, `${filename}${ext}`);
      }
      if (prefix) {
        pathname = joinURL(prefix, pathname).replace(/\/+/g, "/").replace(/^\/+/, "");
      }
      const httpMetadata = { contentType };
      if (contentLength) {
        httpMetadata.contentLength = contentLength;
      }
      const mpu = await bucket.createMultipartUpload(pathname, { httpMetadata, customMetadata });
      return mapR2MpuToBlobMpu(mpu);
    },
    resumeMultipartUpload(pathname, uploadId) {
      const mpu = bucket.resumeMultipartUpload(decodeURIComponent(pathname), uploadId);
      return mapR2MpuToBlobMpu(mpu);
    },
    async handleUpload(event, options = {}) {
      assertMethod(event, ["POST", "PUT", "PATCH"]);
      options = defu$1(options, {
        formKey: "files",
        multiple: true
      });
      const form = await readFormData(event);
      const files = form.getAll(options.formKey);
      if (!files) {
        throw createError({ statusCode: 400, message: "Missing files" });
      }
      if (!options.multiple && files.length > 1) {
        throw createError({ statusCode: 400, message: "Multiple files are not allowed" });
      }
      const objects = [];
      try {
        if (options.ensure) {
          for (const file of files) {
            ensureBlob(file, options.ensure);
          }
        }
        for (const file of files) {
          const object = await blob.put(file.name, file, options.put);
          objects.push(object);
        }
      } catch (e) {
        throw createError({
          statusCode: 500,
          message: `Storage error: ${e.message}`
        });
      }
      return objects;
    },
    async createCredentials(options = {}) {
      {
        throw createError("hubBlob().createCredentials() is only available in production or in development with `--remote` flag.");
      }
    }
  };
  return {
    ...blob,
    delete: blob.del,
    handleMultipartUpload: createMultipartUploadHandler(blob)
  };
}
function proxyHubBlob(projectUrl, secretKey, headers) {
  requireNuxtHubFeature("blob");
  const blobAPI = ofetch.create({
    baseURL: joinURL(projectUrl, "/api/_hub/blob"),
    headers: {
      Authorization: `Bearer ${secretKey}`,
      ...headers
    }
  });
  const blob = {
    async list(options = { limit: 1e3 }) {
      return blobAPI("/", {
        method: "GET",
        query: options
      });
    },
    async serve(_event, pathname) {
      return blobAPI(encodeURIComponent(pathname), {
        method: "GET"
      });
    },
    async put(pathname, body, options = {}) {
      const { contentType, contentLength, ...query } = options;
      const headers2 = {};
      if (contentType) {
        headers2["content-type"] = contentType;
      }
      if (contentLength) {
        headers2["content-length"] = contentLength;
      }
      if (body instanceof Uint8Array) {
        body = new Blob([body]);
      }
      return await blobAPI(encodeURIComponent(pathname), {
        method: "PUT",
        headers: headers2,
        body,
        query
      });
    },
    async head(pathname) {
      return await blobAPI(`/head/${encodeURIComponent(pathname)}`, {
        method: "GET"
      });
    },
    async get(pathname) {
      return await blobAPI(`/${encodeURIComponent(pathname)}`, {
        method: "GET",
        responseType: "blob"
      }).catch((e) => {
        if (e.status === 404) {
          return null;
        }
        throw e;
      });
    },
    async del(pathnames) {
      if (Array.isArray(pathnames)) {
        await blobAPI("/delete", {
          method: "POST",
          body: {
            pathnames: pathnames.map((p) => encodeURIComponent(p))
          }
        });
      } else {
        await blobAPI(encodeURIComponent(pathnames), {
          method: "DELETE"
        });
      }
      return;
    },
    async createMultipartUpload(pathname, options = {}) {
      return await blobAPI(`/multipart/create/${encodeURIComponent(pathname)}`, {
        method: "POST",
        query: options
      });
    },
    resumeMultipartUpload(pathname, uploadId) {
      return {
        pathname,
        uploadId,
        async uploadPart(partNumber, body) {
          return await blobAPI(`/multipart/upload/${encodeURIComponent(pathname)}`, {
            method: "PUT",
            query: {
              uploadId,
              partNumber
            },
            body
          });
        },
        async abort() {
          await blobAPI(`/multipart/abort/${encodeURIComponent(pathname)}`, {
            method: "DELETE",
            query: {
              uploadId
            }
          });
        },
        async complete(parts) {
          return await blobAPI(`/multipart/complete/${encodeURIComponent(pathname)}`, {
            method: "POST",
            query: {
              uploadId
            },
            body: {
              parts
            }
          });
        }
      };
    },
    async handleUpload(event, options = {}) {
      return await blobAPI("/", {
        method: "POST",
        body: await readFormData(event),
        query: options
      });
    },
    async createCredentials(options = {}) {
      return await blobAPI("/credentials", {
        method: "POST",
        body: options
      });
    }
  };
  return {
    ...blob,
    delete: blob.del,
    handleMultipartUpload: createMultipartUploadHandler(blob)
  };
}
function createMultipartUploadHandler(hub) {
  const { createMultipartUpload, resumeMultipartUpload } = hub;
  const createHandler = async (event, options) => {
    const { pathname } = await getValidatedRouterParams(event, z$1.object({
      pathname: z$1.string().min(1)
    }).parse);
    options ||= {};
    if (getHeader(event, "x-nuxthub-file-content-type")) {
      options.contentType ||= getHeader(event, "x-nuxthub-file-content-type");
    }
    try {
      const object = await createMultipartUpload(pathname, options);
      return {
        uploadId: object.uploadId,
        pathname: object.pathname
      };
    } catch (e) {
      throw createError({
        statusCode: 400,
        message: e.message
      });
    }
  };
  const uploadHandler = async (event) => {
    const { pathname } = await getValidatedRouterParams(event, z$1.object({
      pathname: z$1.string().min(1)
    }).parse);
    const { uploadId, partNumber } = await getValidatedQuery(event, z$1.object({
      uploadId: z$1.string(),
      partNumber: z$1.coerce.number()
    }).parse);
    const contentLength = Number(getHeader(event, "content-length") || "0");
    const stream = getRequestWebStream(event);
    const body = await streamToArrayBuffer(stream, contentLength);
    const mpu = resumeMultipartUpload(pathname, uploadId);
    try {
      return await mpu.uploadPart(partNumber, body);
    } catch (e) {
      throw createError({ status: 400, message: e.message });
    }
  };
  const completeHandler = async (event) => {
    const { pathname } = await getValidatedRouterParams(event, z$1.object({
      pathname: z$1.string().min(1)
    }).parse);
    const { uploadId } = await getValidatedQuery(event, z$1.object({
      uploadId: z$1.string().min(1)
    }).parse);
    const { parts } = await readValidatedBody(event, z$1.object({
      parts: z$1.array(z$1.object({
        partNumber: z$1.number(),
        etag: z$1.string()
      }))
    }).parse);
    const mpu = resumeMultipartUpload(pathname, uploadId);
    try {
      const object = await mpu.complete(parts);
      return object;
    } catch (e) {
      throw createError({ status: 400, message: e.message });
    }
  };
  const abortHandler = async (event) => {
    const { pathname } = await getValidatedRouterParams(event, z$1.object({
      pathname: z$1.string().min(1)
    }).parse);
    const { uploadId } = await getValidatedQuery(event, z$1.object({
      uploadId: z$1.string().min(1)
    }).parse);
    const mpu = resumeMultipartUpload(pathname, uploadId);
    try {
      await mpu.abort();
    } catch (e) {
      throw createError({ status: 400, message: e.message });
    }
  };
  const handler = async (event, options) => {
    const method = event.method;
    const { action } = await getValidatedRouterParams(event, z$1.object({
      action: z$1.enum(["create", "upload", "complete", "abort"])
    }).parse);
    if (action === "create" && method === "POST") {
      return {
        action,
        data: await createHandler(event, options)
      };
    }
    if (action === "upload" && method === "PUT") {
      return {
        action,
        data: await uploadHandler(event)
      };
    }
    if (action === "complete" && method === "POST") {
      return {
        action,
        data: await completeHandler(event)
      };
    }
    if (action === "abort" && method === "DELETE") {
      return {
        action,
        data: await abortHandler(event)
      };
    }
    throw createError({ status: 405 });
  };
  return async (event, options) => {
    const result = await handler(event, options);
    if (result.data) {
      event.respondWith(Response.json(result.data));
    } else {
      sendNoContent(event);
    }
    return result;
  };
}
function getContentType(pathOrExtension) {
  return pathOrExtension && mime.getType(pathOrExtension) || "application/octet-stream";
}
function mapR2ObjectToBlob(object) {
  return {
    pathname: object.key,
    contentType: object.httpMetadata?.contentType || getContentType(object.key),
    size: object.size,
    httpEtag: object.httpEtag,
    uploadedAt: object.uploaded,
    httpMetadata: object.httpMetadata || {},
    customMetadata: object.customMetadata || {}
  };
}
function mapR2MpuToBlobMpu(mpu) {
  return {
    pathname: mpu.key,
    uploadId: mpu.uploadId,
    async uploadPart(partNumber, value) {
      return await mpu.uploadPart(partNumber, value);
    },
    abort: mpu.abort,
    async complete(uploadedParts) {
      const object = await mpu.complete(uploadedParts);
      return mapR2ObjectToBlob(object);
    }
  };
}
const FILESIZE_UNITS = ["B", "KB", "MB", "GB"];
function fileSizeToBytes(input) {
  const regex = new RegExp(
    `^(\\d+)(\\.\\d+)?\\s*(${FILESIZE_UNITS.join("|")})$`,
    "i"
  );
  const match = input.match(regex);
  if (!match) {
    throw createError({ statusCode: 400, message: `Invalid file size format: ${input}` });
  }
  const sizeValue = Number.parseFloat(match[1]);
  const sizeUnit = match[3].toUpperCase();
  if (!FILESIZE_UNITS.includes(sizeUnit)) {
    throw createError({ statusCode: 400, message: `Invalid file size unit: ${sizeUnit}` });
  }
  const bytes = sizeValue * Math.pow(1024, FILESIZE_UNITS.indexOf(sizeUnit));
  return Math.floor(bytes);
}
function ensureBlob(blob, options = {}) {
  requireNuxtHubFeature("blob");
  if (!options.maxSize && !options.types?.length) {
    throw createError({
      statusCode: 400,
      message: "ensureBlob() requires at least one of maxSize or types to be set."
    });
  }
  if (options.maxSize) {
    const maxFileSizeBytes = fileSizeToBytes(options.maxSize);
    if (blob.size > maxFileSizeBytes) {
      throw createError({
        statusCode: 400,
        message: `File size must be less than ${options.maxSize}`
      });
    }
  }
  const blobShortType = blob.type.split("/")[0];
  if (options.types?.length && !options.types.includes(blob.type) && !options.types.includes(blobShortType) && !(options.types.includes("pdf") && blob.type === "application/pdf")) {
    throw createError({
      statusCode: 400,
      message: `File type is invalid, must be: ${options.types.join(", ")}`
    });
  }
}

const _vectorize = {};
function hubVectorize(index) {
  requireNuxtHubFeature("vectorize");
  if (_vectorize[index]) {
    return _vectorize[index];
  }
  const hub = useRuntimeConfig().hub;
  const bindingName = `VECTORIZE_${index.toUpperCase()}`;
  const binding = process.env[bindingName] || globalThis.__env__?.[bindingName] || globalThis[bindingName];
  if (hub.remote && hub.projectUrl && !binding) {
    const cfAccessHeaders = getCloudflareAccessHeaders(hub.cloudflareAccess);
    _vectorize[index] = proxyHubVectorize(index, hub.projectUrl, hub.projectSecretKey || hub.userToken, cfAccessHeaders);
    return _vectorize[index];
  }
  if (binding) {
    _vectorize[index] = binding;
    return _vectorize[index];
  }
  if (!hub.remote) {
    return void 0;
  }
  throw createError(`Missing Cloudflare Vectorize binding (${bindingName})`);
}
function proxyHubVectorize(index, projectUrl, secretKey, headers) {
  requireNuxtHubFeature("vectorize");
  const vectorizeAPI = ofetch.create({
    baseURL: joinURL(projectUrl, `/api/_hub/vectorize/${index}`),
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      ...headers
    }
  });
  return {
    async insert(vectors) {
      return vectorizeAPI("/insert", { body: { vectors } }).catch(handleProxyError);
    },
    async upsert(vectors) {
      return vectorizeAPI("/upsert", { body: { vectors } }).catch(handleProxyError);
    },
    async query(query, params) {
      return vectorizeAPI("/query", { body: { query, params } }).catch(handleProxyError);
    },
    async getByIds(ids) {
      return vectorizeAPI("/getByIds", { body: { ids } }).catch(handleProxyError);
    },
    async deleteByIds(ids) {
      return vectorizeAPI("/deleteByIds", { body: { ids } }).catch(handleProxyError);
    },
    async describe() {
      return vectorizeAPI("/describe").catch(handleProxyError);
    }
  };
}
function handleProxyError(err) {
  throw createError({
    statusCode: err.statusCode,
    // @ts-expect-error not aware of data property
    message: err.data?.message || err.message
  });
}

const manifest_get = eventHandler(async (event) => {
  await requireNuxtHubAuthorization();
  const { version, cache, ai, analytics, browser, blob, kv, database, vectorize } = useRuntimeConfig().hub;
  const [dbCheck, kvCheck, blobCheck, vectorizeCheck] = await Promise.all([
    falseIfFail(() => database && hubDatabase().exec("PRAGMA table_list")),
    falseIfFail(() => kv && hubKV().getKeys("__check__")),
    falseIfFail(() => blob && hubBlob().list({ prefix: "__check__" })),
    // vectorize check should verify all indexes. return the index name
    Promise.all(Object.keys(vectorize).map(async (index) => {
      const vectorizeIndex = hubVectorize(index);
      const describe = await falseIfFail(() => vectorizeIndex?.describe());
      return [index, Boolean(describe)];
    }))
  ]);
  const enabledVectorizeIndexes = Object.fromEntries(Object.entries(vectorize).filter(([index]) => vectorizeCheck.find(([name, enabled]) => name === index && enabled)));
  return {
    version,
    storage: {
      database: Boolean(dbCheck),
      kv: Array.isArray(kvCheck),
      blob: Array.isArray(blobCheck?.blobs),
      vectorize: enabledVectorizeIndexes
    },
    features: {
      ai,
      analytics,
      browser,
      cache
    }
  };
});
async function falseIfFail(fn) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res.catch(() => false);
    }
    return res;
  } catch (e) {
    return false;
  }
}

const manifest_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: manifest_get
}, Symbol.toStringTag, { value: 'Module' }));

const syncVariables_post = eventHandler(async (event) => {
  await requireNuxtHubAuthorization();
  const { env, keys } = await readValidatedBody(event, z$1.object({
    env: z$1.string(),
    keys: z$1.array(z$1.string())
  }).parse);
  const variables = keys.map((key) => ({ key, value: process.env[key] }));
  await $fetch(`/api/projects/${process.env.NUXT_HUB_PROJECT_KEY}/variables/sync-from-deployment`, {
    baseURL: process.env.NUXT_HUB_URL || "https://admin.hub.nuxt.com",
    method: "POST",
    body: {
      env: process.env.NUXT_HUB_ENV || env,
      variables
    },
    headers: new Headers({
      authorization: getHeader(event, "authorization") || ""
    })
  });
  return {
    success: true
  };
});

const syncVariables_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: syncVariables_post
}, Symbol.toStringTag, { value: 'Module' }));

const robots_txt = defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  const { origin } = getRequestURL(event);
  return `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;
});

const robots_txt$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: robots_txt
}, Symbol.toStringTag, { value: 'Module' }));

const sitemap_xml = defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  const { origin } = getRequestURL(event);
  const routes = ["/", "/categories", "/favorites"];
  const body = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const r of routes) body.push(`  <url><loc>${origin}${r}</loc></url>`);
  body.push("</urlset>");
  return body.join("\n");
});

const sitemap_xml$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sitemap_xml
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
