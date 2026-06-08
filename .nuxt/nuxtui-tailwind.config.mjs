
      import { defaultExtractor as createDefaultExtractor } from "tailwindcss/lib/lib/defaultExtractor.js";
      import { customSafelistExtractor, generateSafelist } from "C:/Users/mahdiar.rezaee/Documents/woo/shahrelavazemsismoni/node_modules/.pnpm/@nuxt+ui@2.22.3_magicast@0._eb755c92717b7a8020a1a9e4cb63d243/node_modules/@nuxt/ui/dist/runtime/utils/colors";
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
            "C:/Users/mahdiar.rezaee/Documents/woo/shahrelavazemsismoni/node_modules/.pnpm/@nuxt+ui@2.22.3_magicast@0._eb755c92717b7a8020a1a9e4cb63d243/node_modules/@nuxt/ui/dist/runtime/components/**/*.{vue,mjs,ts}",
            "C:/Users/mahdiar.rezaee/Documents/woo/shahrelavazemsismoni/node_modules/.pnpm/@nuxt+ui@2.22.3_magicast@0._eb755c92717b7a8020a1a9e4cb63d243/node_modules/@nuxt/ui/dist/runtime/ui.config/**/*.{mjs,js,ts}"
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
    