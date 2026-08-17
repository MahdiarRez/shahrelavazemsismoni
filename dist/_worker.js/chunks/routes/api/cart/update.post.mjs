import{g as t,d as e,r as i,a as o}from"../../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const n=t`
  mutation updateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
      }
    }
  }
`,a=e(async t=>{const e=await i(t);return await o(t,n,{input:e})});export{a as default};
//# sourceMappingURL=update.post.mjs.map
