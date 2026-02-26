import{g as r,c as e,b as o}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const s=r`
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
`,t=e(async()=>await o(s));export{t as default};
//# sourceMappingURL=categories.get.mjs.map
