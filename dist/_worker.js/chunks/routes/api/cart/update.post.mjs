import{g as t,d as e,a as i,b as o}from"../../../_/nitro.mjs";import"node:buffer";import"node:timers";import"node:events";import"node:process";import"cloudflare:workers";import"node:async_hooks";const a=t`
  mutation updateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
      }
    }
  }
`,n=e(async t=>{const e=await i(t);return await o(t,a,{input:e})});export{n as default};
//# sourceMappingURL=update.post.mjs.map
