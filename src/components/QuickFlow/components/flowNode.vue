<script lang="ts" setup>
import { toRefs, computed, defineEmits, reactive, Ref, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { IQuickFlowNode, IQuickFlowLine } from "../type";

const emit = defineEmits(['nodeClick', 'nodeDelete', 'nodeMove', 'createLine', 'pointClick'])
const props = defineProps({
    item: {
        type: Object,
        default: () => {
        },
    },
    isLine: {
        type: Boolean,
        default: false
    },
    selectNode: {
        type: Object,
        default: () => {
        },
    }
})
const { item, isLine, selectNode } = toRefs(props) as {
    item: Ref<IQuickFlowNode>
    isLine: Ref<boolean>,
    selectNode: Ref<IQuickFlowNode>
}
const active = ref(false)
console.log('active', active.value);
const nodeStyle = reactive({
    top: '' + item.value.y + 'px',
    left: '' + item.value.x + 'px',
    backgroundColor: item.value.backgroundColor,
    width: item.value.width + 'px',
    height: item.value.height + 'px',
    lineHeight: item.value.height + 'px',
    border: item.value.border,
    borderRadius: item.value.borderRadius,
})
const activeClassName = computed(() => {
    if (active.value) {
        return 'active'
    } else {
        return ''
    }
})
const typeClassName = computed(() => {
    if (item.value.type === 'start') {
        return 'circular'
    } else if (item.value.type === 'end') {
        return 'circular'
    } else {
        return 'rectangle'
    }
})
const showPoint = () => {
    if (selectNode.value.id == item.value.id || active.value) {
        return true
    }
}
const nodeClick = (element: any) => {
    emit('nodeClick', element)
}
const nodeMouseover = (element: IQuickFlowNode) => {
    if (selectNode.value.id != item.value.id && isLine.value) {
        active.value = true
    }
}
const nodeMouseleave = (element: IQuickFlowNode) => {
    active.value = false
}
const nodePointMousedown = (element: IQuickFlowNode, postion: string) => {
    emit('pointClick', true)
    let x1 = item.value.x
    let y1 = item.value.y
    if (postion === 'top') {
        x1 = x1 + item.value.width / 2
    } else if (postion === 'bottom') {
        x1 = x1 + item.value.width / 2
        y1 = y1 + item.value.height
    } else if (postion === 'left') {
        y1 = y1 + item.value.height / 2
    } else if (postion === 'right') {
        x1 = x1 + item.value.width
        y1 = y1 + item.value.height / 2
    }
    const lineStart = reactive<IQuickFlowLine>({
        id: uuid(),
        type: 'line',
        backgroundColor: 'gray',
        x1: x1,
        y1: y1,
        x2: 0,
        y2: 0,
        fromNodeId: item.value.id,
        fromPosition: postion,
        toNodeId: '',
        toPosition: ''
    })
    localStorage.setItem('line', JSON.stringify(lineStart))
}
const nodePointMouseup = (element: IQuickFlowNode, postion: string) => {
    emit('pointClick', false)
    let x2 = item.value.x
    let y2 = item.value.y
    if (postion === 'top') {
        x2 = x2 + item.value.width / 2
    } else if (postion === 'bottom') {
        x2 = x2 + item.value.width / 2
        y2 = y2 + item.value.height
    } else if (postion === 'left') {
        y2 = y2 + item.value.height / 2
    } else if (postion === 'right') {
        x2 = x2 + item.value.width
        y2 = y2 + item.value.height / 2
    }
    const lineStr = localStorage.getItem('line')
    const lineEnd: IQuickFlowLine = lineStr && JSON.parse(lineStr)
    lineEnd.x2 = x2
    lineEnd.y2 = y2
    lineEnd.toNodeId = item.value.id
    lineEnd.toPosition = postion
    console.log('x2', x2, postion);
    console.log('y2', y2, postion);
    emit('createLine', lineEnd)
}
const nodeDelete = (e) => {

}
const vMove = {
    mounted(el: any) {
        const odiv = el
        odiv.onmousedown = (e: any) => {
            const disX = e.clientX - odiv.offsetLeft
            const disY = e.clientY - odiv.offsetTop
            document.onmousemove = (e1: any) => {
                const left = e1.clientX - disX
                const top = e1.clientY - disY
                item.value.x = left
                item.value.y = top
                emit('nodeMove', item.value)
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    },
}
</script>
<template>
    <div v-move :style="nodeStyle" class="node-item" :class="activeClassName, typeClassName" @click.stop="nodeClick(item)"
        @mouseover.stop="nodeMouseover(item)" @mouseleave.stop="nodeMouseleave(item)">
        <template v-if="showPoint()">
            <div class="top node-point" @mousedown.stop="nodePointMousedown(item, 'top')"
                @mouseup.stop="nodePointMouseup(item, 'top')">
            </div>
            <div class="bottom node-point" @mousedown.stop="nodePointMousedown(item, 'bottom')"
                @mouseup.stop="nodePointMouseup(item, 'bottom')"></div>
            <div class="left node-point" @mousedown.stop="nodePointMousedown(item, 'left')"
                @mouseup.stop="nodePointMouseup(item, 'left')"></div>
            <div class="right node-point" @mousedown.stop="nodePointMousedown(item, 'right')"
                @mouseup.stop="nodePointMouseup(item, 'right')"></div>
        </template>
        <!-- <div class="icon">
                        <el-icon style="vertical-align: middle" :size="40" color="#fff">
                            <component :is="item.icon" />
                        </el-icon>
                    </div> -->
        <div class="title" :style="{ color: item.color, }">
            {{ item.name }}
        </div>
    </div>
</template>
<style scoped lang="scss">
.node-item {
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    height: 100px;
    width: 200px;
    text-align: center;
    line-height: 100px;
    pointer-events: all;
    visibility: visible;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    user-select: none;
    padding: 5px;

    .node-point {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: rgb(0, 255, 21);
        border-radius: 100%;
        // pointer-events: all;
        cursor: crosshair;
    }

    .top {
        top: -8px;
        left: 50%;
    }

    .bottom {
        bottom: -8px;
        left: 50%;
    }

    .left {
        top: 50%;
        left: -8px;
    }

    .right {
        top: 50%;
        right: -8px;
    }

    .icon {
        // position: absolute;
        // left: 18px;
        // top: 4px;
        // border-radius: 50%;
    }

    .title {
        // text-align: center;
        // height: 100%;
        // width: 60%;
        // position: absolute;
        // right: 5px;
    }
}

.active {
    border: 3px solid green;
}

.circular {
    border-radius: 100%;
    width: 85px;
    height: 85px;
    background-color: green;
}

.rectangle {
    width: 150px;
    height: 85px;
    background-color: red;
}
</style>