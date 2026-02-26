
      import { defaultExtractor as createDefaultExtractor } from "tailwindcss/lib/lib/defaultExtractor.js";
      import { customSafelistExtractor, generateSafelist } from "/Users/mahdiyarrezaei/Documents/sis/node_modules/.pnpm/@nuxt+ui@2.22.3_magicast@0.5.2_vite@7.3.1_@types+node@25.2.3_jiti@2.6.1_terser@5.46.0_y_9e36ff863f367d7f2508cfdfa5cdf282/node_modules/@nuxt/ui/dist/runtime/utils/colors";
      import formsPlugin from "@tailwindcss/forms";
      import aspectRatio from "@tailwindcss/aspect-ratio";
      import typography from "@tailwindcss/typography";
      import containerQueries from "@tailwindcss/container-queries";
      import headlessUi from "@headlessui/tailwindcss";

      const defaultExtractor = createDefaultExtractor({ tailwindConfig: { separator: ':' } });

      export default {
        plugins: [
          formsPlugin({ strategy: 'class' }),
          aspectRatio,
          typography,
          containerQueries,
          headlessUi
        ],
        content: {
          files: [
            "/Users/mahdiyarrezaei/Documents/sis/node_modules/.pnpm/@nuxt+ui@2.22.3_magicast@0.5.2_vite@7.3.1_@types+node@25.2.3_jiti@2.6.1_terser@5.46.0_y_9e36ff863f367d7f2508cfdfa5cdf282/node_modules/@nuxt/ui/dist/runtime/components/**/*.{vue,mjs,ts}",
            "/Users/mahdiyarrezaei/Documents/sis/node_modules/.pnpm/@nuxt+ui@2.22.3_magicast@0.5.2_vite@7.3.1_@types+node@25.2.3_jiti@2.6.1_terser@5.46.0_y_9e36ff863f367d7f2508cfdfa5cdf282/node_modules/@nuxt/ui/dist/runtime/ui.config/**/*.{mjs,js,ts}"
          ],
          transform: {
            vue: (content) => {
              return content.replaceAll(/(?:\r\n|\r|\n)/g, ' ')
            }
          },
          extract: {
            vue: (content) => {
              return [
                ...defaultExtractor(content),
                ...customSafelistExtractor("U", content, ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary","secondary","alizarin-crimson"], ["primary"])
              ]
            }
          }
        },
        safelist: generateSafelist(["primary"], ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary","secondary","alizarin-crimson"]),
      }
    