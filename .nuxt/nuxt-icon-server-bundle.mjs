import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
function createRemoteCollection(fetchEndpoint) {
  let _cache
  return async () => {
    if (_cache)
      return _cache
    const res = await fetch(fetchEndpoint).then(r => r.json())
    _cache = res
    return res
  }
}

export const collections = {
  'iconamoon': () => require('@iconify-json/iconamoon/icons.json'),
  'svg-spinners': () => require('@iconify-json/svg-spinners/icons.json'),
}