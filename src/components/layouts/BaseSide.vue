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
    <el-sub-menu index="/system">
      <template #title>
        <el-icon><location /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/user">用户管理</el-menu-item>
      <el-menu-item index="/system/role">角色管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

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
