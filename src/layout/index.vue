<<<<<<< HEAD
<script setup lang="ts"></script>
<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div style="display: flex">
      <BaseSide />
      <router-view></router-view>
    </div>
=======
<script setup lang="ts">
import { ref } from "vue";
const isMicroApp = ref(window.__MICRO_APP_BASE_APPLICATION__);
</script>
<template>
  <el-config-provider namespace="ep">
    <template v-if="isMicroApp">
      <router-view></router-view>
    </template>
    <template v-else>
      <BaseHeader />
      <div style="display: flex">
        <BaseSide />
        <router-view></router-view>
      </div>
    </template>
>>>>>>> a8ac1d01a77576182e7b613954d3b5b260be1dc2
  </el-config-provider>
</template>
<style scoped></style>
