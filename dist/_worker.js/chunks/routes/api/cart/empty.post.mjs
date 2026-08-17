import{g as t,d as o,a as r}from"../../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const e=t`
	mutation emptyCart($input: EmptyCartInput!) {
		emptyCart(input: $input) {
			cart {
				contents {
					nodes {
						key
					}
				}
			}
		}
	}
`,n=o(async t=>await r(t,e,{input:{clearPersistentCart:!0}}));export{n as default};
//# sourceMappingURL=empty.post.mjs.map
