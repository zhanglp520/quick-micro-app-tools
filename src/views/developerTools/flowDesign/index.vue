<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'
import QuickFlow from "@/components/QuickFlow/index.vue";
import { IQuickFlowNode, IQuickFlowLine, IQuickFlow } from "@/components/QuickFlow/type";

interface IQuickFlowForm {
  id: string
  name: string
  description: string
}
interface IQuickFlowNodeForm extends IQuickFlowNode {

}
interface IQuickFlowLineForm extends IQuickFlowLine {

}
interface IQuickToolItem {
  value: number
  label: string
  icon: string
  type: string
}
interface IQuickTool {
  value: number
  label: string
  chidren?: Array<IQuickFlowNode>
}
interface IQuickOption {
  value: string
  label: string
}
interface IQuickForm {
  value: string
  label: string
  type?: string
  options?: Array<IQuickOption>
}
interface IQuickAttribute {
  value: string
  label: string
  model: any
  chidren?: Array<IQuickForm>
}
const dragNodeType = ref('')
const dragNode = reactive<IQuickFlowNode>({
  id: '',
  name: '',
  type: '',
  icon: '',
  color: '',
  backgroundColor: '',
  border: '',
  borderRadius: '',
  width: 0,
  height: 0,
  x: 0,
  y: 0,
})
const activeName = ref('second')
const toolData = ref<Array<IQuickTool>>([
  {
    value: 1,
    label: '基本流程图组件',
    chidren: [
      {
        id: '1',
        name: '开始',
        icon: 'video-play',
        type: 'start',
        color: '#fff',
        backgroundColor: 'green',
        border: '1px solid gray',
        borderRadius: '100%',
        width: 70,
        height: 70,
        x: 0,
        y: 0
      },
      {
        id: '2',
        name: '结束',
        icon: 'video-pause',
        type: 'end',
        color: '#fff',
        backgroundColor: 'red',
        border: '1px solid gray',
        borderRadius: '100%',
        width: 70,
        height: 70,
        x: 0,
        y: 0
      },
      {
        id: '3',
        name: '活动',
        icon: 'crop',
        type: 'node',
        color: '#fff',
        backgroundColor: 'rgb(194 189 183)',
        border: '1px solid gray',
        width: 100,
        height: 50,
        x: 0,
        y: 0
      }
    ]
  },
  {
    value: 1,
    label: '规则流程图组件',
    chidren: [
      {
        id: '3',
        name: "结论",
        icon: "Conclusion.png",
        type: "conclusionnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '4',
        name: "输入节点",
        icon: "input.png",
        type: "inputnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '5',
        name: "常量节点",
        icon: "Const.png",
        type: "constnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '6',
        name: "乘法节点",
        icon: "Multiply.png",
        type: "multiplynode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '7',
        name: "除法节点",
        icon: "Divide.png",
        type: "dividenode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '8',
        name: "加法节点",
        icon: "Plus.png",
        type: "plusnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '9',
        name: "减法节点",
        icon: "Minus.png",
        type: "minusnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '10',
        name: "大于节点",
        icon: "Bigger.png",
        type: "biggernode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '11',
        name: "等于节点",
        icon: "Equal.png",
        type: "equalnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '12',
        name: "逻辑与",
        icon: "AND.png",
        type: "andnode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
      {
        id: '13',
        name: "逻辑或",
        icon: "OR.png",
        type: "ornode",
        color: "#000",
        backgroundColor: 'rgb(194 189 183)',
        border: "1px solid #4a5b79",
        width: 100,
        height: 50,
        x: 0,
        y: 0
      },
    ]
  }
])
const flowForm = reactive<IQuickFlowForm>({
  id: '',
  name: '',
  description: ''
})
const nodeForm = reactive<IQuickFlowNodeForm>({
  id: '',
  name: '',
  type: '',
  color: '',
  backgroundColor: '',
  border: '',
  borderRadius: '',
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  icon: ''
})
const lineForm = reactive<IQuickFlowLineForm>({
  id: '',
  type: '',
  backgroundColor: '',
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  fromNodeId: '',
  toNodeId: '',
  fromPosition: '',
  toPosition: ''
})
const attributeData = ref<Array<IQuickAttribute>>([
  {
    value: 'first',
    label: '流程属性',
    model: flowForm,
    chidren: [
      {
        value: 'id',
        label: '流程标识',
      },
      {
        value: 'name',
        label: '流程名称',
      },
      {
        value: 'description',
        label: '流程描述',
      },
    ]
  },
  {
    value: 'second',
    label: '节点属性',
    model: nodeForm,
    chidren: [
      {
        value: 'id',
        label: '标识',
      },
      {
        value: 'name',
        label: '节点名称',
      },
      {
        value: 'type',
        label: '节点类型',
        type: 'select',
        options: [
          {
            label: '开始',
            value: 'start'
          },
          {
            label: '结束',
            value: 'end'
          },
          {
            label: '活动',
            value: 'node'
          },
        ]
      },
      {
        value: 'color',
        label: '字体颜色',
      },
      {
        value: 'backgroundColor',
        label: '背景色',
      },
      {
        value: 'border',
        label: '边框样式',
      },
      {
        value: 'borderRadius',
        label: '圆角样式',
      },
      {
        value: 'width',
        label: '宽度',
      },
      {
        value: 'height',
        label: '高度',
      },
      {
        value: 'x',
        label: 'x轴',
      },
      {
        value: 'y',
        label: 'y轴',
      },
      {
        value: 'icon',
        label: '图标',
      },
    ]
  }, {
    value: 'three',
    label: '连接线属性',
    model: lineForm,
    chidren: [
      {
        value: 'id',
        label: '标识',
      },
      {
        value: 'type',
        label: '线类型',
        type: 'select',
        options: [
          {
            label: '实线',
            value: 'solid'
          },
          {
            label: '虚线',
            value: 'd'
          },
          {
            label: '流动线',
            value: 'd1'
          },
          {
            label: '箭头线',
            value: 'jt'
          },
        ]
      },
      {
        value: 'backgroundColor',
        label: '背景色',
      },
      {
        value: 'x1',
        label: 'x1轴',
      },
      {
        value: 'y1',
        label: 'y1轴',
      }, {
        value: 'x2',
        label: 'x2轴',
      },
      {
        value: 'y2',
        label: 'y2轴',
      },
    ]
  }
])
const nodeDataList = ref<Array<IQuickFlowNode>>([])
const lineDataList = ref<Array<IQuickFlowLine>>([])
const flowData = reactive<IQuickFlow>({
  id: '1',
  name: '测试',
  description: '测试流程',
  nodes: nodeDataList.value,
  lines: lineDataList.value
})
const handleNodeClick = (node: IQuickFlowNode) => {
  const {
    id,
    name,
    type,
    color,
    backgroundColor,
    width,
    height,
    x,
    y
  } = node
  nodeForm.id = id
  nodeForm.name = name
  nodeForm.type = type
  nodeForm.color = color
  nodeForm.backgroundColor = backgroundColor
  nodeForm.width = width
  nodeForm.height = height
  nodeForm.x = x
  nodeForm.y = y
}
const handleNodeMove = (item: IQuickFlowNode) => {
  if (item) {
    lineDataList.value = lineDataList.value.map((element) => {
      if (element.fromNodeId == item.id) {
        let x1 = item.x
        let y1 = item.y
        switch (element.fromPosition) {
          case 'top':
            x1 = x1 + item.width / 2
            break;
          case 'bottom':
            x1 = x1 + item.width / 2
            y1 = y1 + item.height
            break;
          case 'left':
            y1 = y1 + item.height / 2
            break;
          case 'right':
            x1 = x1 + item.width
            y1 = y1 + item.height / 2
            break;

          default:
            break;
        }
        element.x1 = x1
        element.y1 = y1
      } else if (element.toNodeId == item.id) {
        let x2 = item.x
        let y2 = item.y
        switch (element.toPosition) {
          case 'top':
            x2 = x2 + item.width / 2
            break;
          case 'bottom':
            x2 = x2 + item.width / 2
            y2 = y2 + item.height
            break;
          case 'left':
            y2 = y2 + item.height / 2
            break;
          case 'right':
            x2 = x2 + item.width
            y2 = y2 + item.height / 2
            break;

          default:
            break;
        }
        element.x2 = x2
        element.y2 = y2
      }
      return element
    })
  }
}
const handleDeleteNode = (node: IQuickFlowNode) => {
  const index = nodeDataList.value.findIndex(x => x.id === nodeForm.id)
  if (index !== -1) {
    nodeDataList.value.splice(index, 1)
  }
}
const createLine = (line: IQuickFlowLine) => {
  console.log('createLine-flow', line);

  lineDataList.value.push({
    ...line
  })
}
const dragstart = (item: any) => {
  console.log('拖起', item)
  dragNode.id = item.id
  dragNode.name = item.name
  dragNode.type = item.type
  dragNode.icon = item.icon
  dragNode.color = item.color
  dragNode.backgroundColor = item.backgroundColor
  dragNode.border = item.border
  dragNode.borderRadius = item.borderRadius
  dragNode.width = item.width
  dragNode.height = item.height
}
const allowDrop = (e: any) => {
  console.log('允许')

  e.preventDefault()
}
const drop = (e: any) => {
  console.log('放下', dragNode)
  e.preventDefault()
  const left = e.clientX - 550//TODO:不准确，但不影响使用  510 
  const top = e.clientY - 220//TODO:不准确，但不影响使用   210

  // const left = e.clientX//TODO:不准确，但不影响使用  510 
  // const top = e.clientY//TODO:不准确，但不影响使用   210
  nodeDataList.value.push({
    ...dragNode,
    id: uuid(),
    x: left,
    y: top
  })
}
const clearCavas = () => {
  nodeDataList.value.length = 0
  lineDataList.value.length = 0
  // flowData.nodes = []
  // flowData.lines = []
  // flowData.nodes.push(...nodeDataList.value)
  // flowData.lines.push(...lineDataList.value)
  console.log('clearCavas-flowData', flowData);
}
const importDialogVisible = ref(false)
const importJsonContent = ref('')
const importJson = () => {
  importDialogVisible.value = true
}
const handleImport = () => {
  const flow: IQuickFlow = JSON.parse(importJsonContent.value)
  flowData.nodes.push(...flow.nodes)
  flowData.lines.push(...flow.lines)
  importDialogVisible.value = false
}
const exportDialogVisible = ref(false)
const exportJsonContent = ref('')
const exportJson = () => {
  exportDialogVisible.value = true
  exportJsonContent.value = JSON.stringify(flowData, null, 8)
}
watch(() => nodeForm, (val) => {
  console.log('watch-nodeForm', val);
  nodeDataList.value.map((element) => {
    if (element.id === val.id) {
      element.name = val.name
      element.x = val.x
      element.y = val.y
      element.width = val.width
      element.height = val.height
      element.color = val.color
      element.backgroundColor = val.backgroundColor
    }
  })
  console.log('nodeDataList1', nodeDataList.value)
}, { deep: true })
</script>
<template>
  <div>
    <el-row>
      <el-col :span="4">
        <template v-for="(item, index) in toolData" :key="index">
          <div class="basic-field">
            <div class="field-title">{{ item.label }}</div>
            <div class="control-wrap">
              <template v-for="(childItem, childIndex) in item.chidren" :key="childIndex">
                <div class="control" :draggable="true" @dragstart="dragstart(childItem)">
                  <el-icon style="vertical-align: middle" :size="20">
                    <component :is="childItem.icon" />
                  </el-icon>
                  <span style="margin-left:5px;">{{ childItem.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-col>
      <el-col :span="16">
        <div class="toolbar">
          <el-button :disabled="nodeDataList.length > 0 && nodeForm.id !== undefined ? false : true" type="primary"
            @click="handleDeleteNode">删除</el-button>
          <!--  <el-button type="primary" @click="prview">预览</el-button> -->
          <el-button :disabled="nodeDataList.length > 0 ? false : true" type="success"
            @click="clearCavas">清空画布</el-button>
          <el-button type="info" @click="importJson">导入JSON</el-button>
          <el-button type="warning" @click="exportJson">导出JSON</el-button>
        </div>
        <div class="flow-design" @drop="drop" @dragover="allowDrop">
          <quick-flow :data="flowData" @nodeClick="handleNodeClick" @nodeDelete="handleDeleteNode"
            @createLine="createLine" @nodeMove="handleNodeMove"></quick-flow>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="attribute">
          <el-tabs v-model="activeName" class="demo-tabs">
            <template v-for="(item, index) in attributeData">
              <el-tab-pane :label="item.label" :name="item.value">
                <div class="wrap">
                  <template v-for="(childItem, childIndex) in item.chidren" :key="childIndex">
                    <div class="item">
                      <div class="title">{{ childItem.label }}</div>
                      <div class="value">
                        <el-form ref="formRef" :model="item.model" :inline="true" size="default">
                          <template v-if="childItem.type === 'select'">
                            <el-select disabled v-model="item.model[childItem.value]">
                              <el-option v-for=" (option, optionsIndex) in childItem.options" :key="optionsIndex"
                                :label="option.label" :value="option.value" />
                            </el-select>
                          </template>
                          <template v-else>
                            <el-input :readonly="childItem.value === 'id'" v-model="item.model[childItem.value]" />
                          </template>
                        </el-form>
                      </div>
                    </div>
                  </template>
                </div>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="importDialogVisible" title="导入JSON" width="30%">
      <div class="title">
        JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可
      </div>
      <div>
        <el-input v-model="importJsonContent" :rows="20" type="textarea" placeholder="Please input" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleImport"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="exportDialogVisible" title="导出JSON" width="30%">
      <div class="title">
        JSON格式如下，直接复制生成的json覆盖代码的配置项即可
      </div>
      <div>
        <el-input v-model="exportJsonContent" :rows="20" type="textarea" placeholder="Please input" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exportDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.field-title {
  padding: 10px;
}

.control-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .control {
    width: 100px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid transparent;
  }

  .control:hover {
    border: dashed 1px #409eff;
    cursor: move;
  }
}

.toolbar {
  text-align: right;
  margin-right: 20px;
}

.flow-design {
  width: 100%;
  border: 1px dashed #999;
  min-height: calc(100vh - 300px);
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  background: #fff;
  // padding: 30px;
}

.form-design {
  margin-top: 10px;
  background: #fff;
  border: 1px dashed #999;
  min-height: calc(100vh - 180px);
  padding: 30px;

  .el-form-item {
    border: 1px solid transparent;
    padding: 10px;
  }

  .el-form-item:hover {
    border: dashed 1px #409eff;
    padding: 10px;
    cursor: move;
  }
}

.attribute {
  .wrap {
    max-height: 650px;
    overflow-y: auto;

    .item {
      .title {
        margin-left: 10px;
      }

      .value {
        margin-top: 10px;
        margin-bottom: 30px;
        margin-left: 10px;
      }
    }
  }
}

// .icon {
//   width: 1rem;
//   height: 1rem;
//   position: relative;
//   vertical-align: -2px;
//   fill: currentColor;
// }
</style>
