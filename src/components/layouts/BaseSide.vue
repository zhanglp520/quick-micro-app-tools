<<<<<<< HEAD
<script lang="ts" setup>
import { ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import microApp from "@micro-zoe/micro-app";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleMenuItemClick = (item: any) => {
  console.log("菜单项点击", item);
  const index = item.index;
  const path = index.replace("/app-tools", "");
  microApp.setData("appTools", { path: path });
};
</script>

=======
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
<template>
  <el-menu
    default-active="/home"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/home">
      <el-icon><icon-menu /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
<<<<<<< HEAD
    <el-menu-item index="/app-tools">
      <el-icon><icon-menu /></el-icon>
      <template #title>跳转子应用-app-tools</template>
    </el-menu-item>
    <el-sub-menu index="/app-tools/system">
      <template #title>
        <el-icon><location /></el-icon>
        <span>子应用-系统管理</span>
      </template>
      <el-menu-item index="/app-tools/system/user" @click="handleMenuItemClick"
        >用户管理</el-menu-item
      >
      <el-menu-item index="/app-tools/system/role" @click="handleMenuItemClick"
        >角色管理</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="/system">
      <template #title>
        <el-icon><location /></el-icon>
        <span>基座-系统管理</span>
=======
    <el-sub-menu index="/system">
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统管理</span>
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
      </template>
      <el-menu-item index="/system/user">用户管理</el-menu-item>
      <el-menu-item index="/system/role">角色管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<<<<<<< HEAD
=======

<script lang="ts" setup>
import { ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
