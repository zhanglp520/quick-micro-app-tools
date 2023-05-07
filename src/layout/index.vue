<script lang="ts" setup>
import { ref } from "vue";
const isMicroApp = ref(window.__MICRO_APP_BASE_APPLICATION__);
</script>
<template>
  <div class="layout">
    <template v-if="isMicroApp">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="left">左侧</div>
      <div class="right">
        <div class="header">顶部</div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  display: flex;
  .left {
    background-color: rgb(8, 30, 30);
    width: 120px;
  }
  .right {
    width: 100%;
    .header {
      background-color: rgb(231, 66, 190);
      height: 50px;
    }
    .content {
      background-color: #c71d1d;
      height: calc(100vh - 50px);
    }
  }
}
</style>
