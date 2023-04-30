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
  </el-config-provider>
</template>
<style scoped></style>
