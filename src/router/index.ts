<<<<<<< HEAD
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
=======
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
import layout from "~/layout/index.vue";

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
        component: () => import("~/views/home/index.vue"),
      },
<<<<<<< HEAD
      {
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        path: "/app-tools/:page*", // vue-router@4.x path的写法为：'/my-page/:page*'
        name: "app-tools",
        component: () => import("~/views/app-tools/index.vue"),
      },
=======
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
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
        component: () => import("~/views/system/user/index.vue"),
      },
      {
        path: "/system/role",
        name: "Role",
        component: () => import("~/views/system/role/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
<<<<<<< HEAD
  history: createWebHistory(),
=======
  history: createWebHashHistory(),
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
});

export default router;
