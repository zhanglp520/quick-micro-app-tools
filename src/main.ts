import { createApp } from "vue";
import App from "./App.vue";
<<<<<<< HEAD
import microApp from "@micro-zoe/micro-app";
=======
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
import router from "~/router/index";

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

<<<<<<< HEAD
const app = createApp(App);
// app.use(ElementPlus);
app.use(router);
app.mount("#app");

microApp.start({
  plugins: {
    modules: {
      appTools: [
        {
          loader(code) {
            // @ts-ignore
            if (process.env.NODE_ENV === "development") {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(
                /(from|import)(\s*['"])(\/app-tools\/)/g,
                (all) => {
                  return all.replace(
                    "/app-tools/",
                    `http://localhost:5174/app-tools/`
                  );
                }
              );
            }
            return code;
          },
        },
      ],
    },
  },
});
=======
const mount = () => {
  const app = createApp(App);
  // app.use(ElementPlus);
  app.use(router);
  app.mount("#app-tools");
};

const handleMicroData = () => {
  if (window.eventCenterForAppTools) {
    const dt = window.eventCenterForAppTools.getData();
    console.log("微应用【app-tools】 getData:", dt);
    if (dt.path && typeof dt.path === "string") {
      console.log("子应用得到的路由-初始", dt.path);
      dt.path = dt.path.replace(/^#/, "");
      if (dt.path && dt.path !== router.currentRoute.value.path) {
        router.push(dt.path as string);
      }
    }
    window.eventCenterForAppTools.addDataListener(
      (data: Record<string, unknown>) => {
        console.log("微应用【app-tools】addDataListener:", data);
        if (data.path && typeof data.path === "string") {
          console.log("子应用得到的路由", data.path);
          data.path = data.path.replace(/^#/, "");
          if (data.path && data.path !== router.currentRoute.value.path) {
            router.push(data.path as string);
          }
        }
      }
    );
    setTimeout(() => {
      window.eventCenterForAppTools.dispatch({ myname: "appTools" });
    }, 3000);
  }
};

if (window.__MICRO_APP_BASE_APPLICATION__) {
  console.log("是否是基座应用", true);
  mount();
  handleMicroData();
} else {
  console.log("是否是基座应用", false);
  mount();
}
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
