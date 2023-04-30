<script setup lang="ts">
import { ref } from "vue";
import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
import { useRouter } from "vue-router";

const router = useRouter();
window.eventCenterForAppTools = new EventCenterForMicroApp("appTools");
const url = "http://localhost:5174/app-tools";
const path = router.currentRoute.value.path;
console.log("path", path);
const pathNew = path.replace("/app-tools", "");
console.log("pathNew", pathNew);

const microAppData = ref({
  msg: "基座下发的初始数据",
  path: pathNew,
});
</script>
<template>
  <div>
    <!-- <h1>开发者工具子应用</h1> -->
    <!-- 
        name(必传)：应用名称
        url(必传)：应用地址，会被自动补全为http://localhost:5174/index.html
        baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/app-tools`
       -->
    <micro-app
      name="appTools"
      :url="url"
      :data="microAppData"
      baseroute="/app-tools"
    ></micro-app>
  </div>
</template>

<style scoped></style>
