<script lang="ts" setup>
import { toRefs, computed, defineEmits } from 'vue'

const emit = defineEmits(['nodeClick'])
const props = defineProps({
    item: {
        type: Object,
        default: () => {
        },
    },
    acive: {
        type: Boolean,
        default: false
    }
})
const { item, acive } = toRefs(props)
console.log('active', acive.value);

const activeClassName = computed(() => {
    if (acive.value) {
        return 'active'
    } else {
        return ''
    }
})
const nodeClick = (item: any) => {
    emit('nodeClick', item)
}
</script>
<template>
    <line @click="nodeClick" :class="activeClassName" :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2"
        style="stroke: rgb(59 19 222); stroke-width: 2;stroke-dasharray: 5;animation: dashdraw 0.5s linear infinite;">
    </line>
</template>