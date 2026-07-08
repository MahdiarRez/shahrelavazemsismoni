import{g as e,c as r,e as o}from"../../_/nitro.mjs";import"node:buffer";import"node:timers";import"node:events";import"node:process";import"cloudflare:workers";import"node:async_hooks";const s=e`
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
`,t=r(async()=>await o(s),{maxAge:600,swr:!0,getKey:()=>"categories"});export{t as default};
//# sourceMappingURL=categories.get.mjs.map
