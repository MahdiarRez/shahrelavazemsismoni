import type { GraphQLClient } from "graphql-request"
declare module '#app' {
  export type GraphQLClientKeys = ''
  interface NuxtApp {
    $graphql: Record<GraphQLClientKeys, GraphQLClient>
  }
}