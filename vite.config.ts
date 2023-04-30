<<<<<<< HEAD
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
=======
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Unocss from "unocss/vite";
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
<<<<<<< HEAD
} from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
=======
} from "unocss";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/app-tools",
  resolve: {
    alias: {
      "~/": `${pathSrc}/`,
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
<<<<<<< HEAD
      extensions: ['vue', 'md'],
=======
      extensions: ["vue", "md"],
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
<<<<<<< HEAD
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
=======
          importStyle: "sass",
        }),
      ],
      dts: "src/components.d.ts",
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
<<<<<<< HEAD
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
  ],
})
=======
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ],
});
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
