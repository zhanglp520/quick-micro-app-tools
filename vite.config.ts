import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_APP_TITLE, VITE_PORT, VITE_APP_BASE_URL } = env;
  return {
    base: "/app-tools/",
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_APP_TITLE,
          },
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "@/assets/scss/globalVariable.scss";',
        },
      },
    },
    server: {
      https: false, // 运行服务是否以https方式
      host: true,
      port: VITE_PORT,
      open: false,
      proxy: {
        [VITE_APP_BASE_URL]: {
          target: "http://localhost:4102/", // 代理的目标地址-本地
          // target: 'https://api.quick.ainiteam.com/', // 代理的目标地址-线上
          changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3102 代理服务会把origin修改为目标地址
          secure: true, // 是否https接
          ws: false, // 是否代理websockets
          rewrite: (path) => path.replace(/^\/dev-api/, ""), // 路径重写
        },
      },
    },
    preview: {
      https: false, // 运行服务是否以https方式
      host: true,
      port: VITE_PORT,
      open: false,
      proxy: {
        [VITE_APP_BASE_URL]: {
          target: "http://localhost:4102/", // 代理的目标地址-本地
          // target: 'https://api.quick.ainiteam.com/', // 代理的目标地址-线上
          changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
          secure: false, // 是否https接口
          ws: false, // 是否代理websockets
          rewrite: (path) => path.replace(/^\/prod-api/, ""), // 路径重写
        },
      },
    },
  };
};
