import{g as t,d as o,a as e,b as r}from"../../_/nitro.mjs";import"node:buffer";import"node:timers";import"node:events";import"node:process";import"cloudflare:workers";import"node:async_hooks";const a=t`
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
`,n=o(async t=>{const o=await e(t);return await r(t,a,{input:o})});export{n as default};
//# sourceMappingURL=checkout.post.mjs.map
