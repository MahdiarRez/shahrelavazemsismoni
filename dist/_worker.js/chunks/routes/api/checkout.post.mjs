import{g as t,d as o,r as e,a as r}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const n=t`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        total
        orderNumber
        date
        paymentMethodTitle
      }
    }
  }
`,a=o(async t=>{const o=await e(t);return await r(t,n,{input:o})});export{a as default};
//# sourceMappingURL=checkout.post.mjs.map
