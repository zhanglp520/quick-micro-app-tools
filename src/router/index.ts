import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layout from "@/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/developerTools",
    name: "DeveloperTools",
    redirect: "/developerTools/flexDebug",
    component: layout,
    children: [
      {
        path: "/developerTools/flexDebug",
        name: "FlexDebug",
        component: () => import("@/views/developerTools/flexDebug/index.vue"),
      },
      {
        path: "/developerTools/flowDesign",
        name: "FlowDesign",
        component: () => import("@/views/developerTools/flowDesign/index.vue"),
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    redirect: "/system/user",
    component: layout,
    children: [
      {
        path: "/system/user",
        name: "User",
        component: () => import("@/views/system/user/index.vue"),
      },
      {
        path: "/system/role",
        name: "Role",
        component: () => import("@/views/system/role/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
