import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   gqlHost: string,

   nitro: {
      envPrefix: string,
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },

   hub: {
      projectUrl: string,

      projectSecretKey: string,

      url: string,

      projectKey: string,

      userToken: string,

      remote: any,

      remoteManifest: any,

      dir: string,

      workers: any,

      ai: boolean,

      analytics: boolean,

      blob: boolean,

      browser: boolean,

      cache: boolean,

      database: boolean,

      kv: boolean,

      vectorize: any,

      databaseMigrationsDirs: Array<string>,

      databaseQueriesPaths: Array<any>,

      version: string,

      env: string,

      openapi: boolean,

      bindings: {
         observability: {
            logs: boolean,
         },

         hyperdrive: any,

         compatibilityFlags: any,
      },

      cloudflareAccess: {
         clientId: any,

         clientSecret: any,
      },
   },
  }
  interface SharedPublicRuntimeConfig {
   version: string,

   notivue: {
      position: string,

      limit: number,

      notifications: {
         global: {
            duration: number,
         },
      },
   },

   hub: any,

   i18n: {
      baseUrl: string,

      defaultLocale: string,

      rootRedirect: any,

      redirectStatusCode: number,

      skipSettingLocaleOnNavigate: boolean,

      locales: Array<{

      }>,

      detectBrowserLanguage: {
         alwaysRedirect: boolean,

         cookieCrossOrigin: boolean,

         cookieDomain: any,

         cookieKey: string,

         cookieSecure: boolean,

         fallbackLocale: string,

         redirectOn: string,

         useCookie: boolean,
      },

      experimental: {
         localeDetector: string,

         typedPages: boolean,

         typedOptionsAndMessages: boolean,

         alternateLinkCanonicalQueries: boolean,

         devCache: boolean,

         cacheLifetime: any,

         stripMessagesPayload: boolean,

         preload: boolean,

         strictSeo: boolean,

         nitroContextDetection: boolean,
      },

      domainLocales: {
         en: {
            domain: string,
         },

         nb: {
            domain: string,
         },

         nl: {
            domain: string,
         },

         de: {
            domain: string,
         },
      },
   },
  }
declare module '@nuxt/schema' {
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }