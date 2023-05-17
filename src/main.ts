import { createApp, App as AppInstance } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "./style.css";
import App from "./App.vue";
import router from "./router/index";

let app: AppInstance | null;

const mount = () => {
  console.log("微应用【app-tools】开始渲染");
  app = createApp(App);
  app.use(ElementPlus);
  app.use(router);
  app.mount("#app-tools");
  handleMicroData();
};

const unmount = () => {
  console.log("微应用【app-tools】开始卸载");
  app?.unmount();
  window.eventCenterForAppTools?.clearDataListener();
  app = null;
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
  console.log("微前端环境");
  // mount();
  // @ts-ignore
  window["micro-app-appTools"] = { mount, unmount };
} else {
  console.log("非微前端环境");
  mount();
}
