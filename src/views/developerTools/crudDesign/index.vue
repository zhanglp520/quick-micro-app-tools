<script lang="ts" setup>
import { FormItem } from '@ainiteam/quick-vue3-ui'
import { reactive, ref } from 'vue'
import { v4 as uuid } from 'uuid'

interface FormAttributeConfig {
  layout: string
  labelAlign: string
}
interface FormDesignConfig {
  form: object
  formItems: Array<FormItem>
}

/**
 * 表单属性默认配置
 */
const defaultFormConfig: FormAttributeConfig = {
  layout: 'horizontal',
  labelAlign: 'left',
}
/**
 * 字段属性默认配置
 */
const defaultformItems = [
  {
    type: 'phone',
    label: '手机号',
    labelWidth: '80px',
    vModelAttribute: 'phone',
    vModel: '15229380174',
    placeholder: '手机号',
  },
]
const formAttributeConfig = reactive<FormAttributeConfig>(defaultFormConfig)
const fieldAtttributeConfig = reactive({})
const formDesignConfig = reactive<FormDesignConfig>({
  form: {},
  formItems: [],
})
const activeName = ref('second')
const importDialogVisible = ref(false)
const exportDialogVisible = ref(false)
const previewDialogVisible = ref(false)
const importJsonContent = ref('')
const exportJsonContent = ref('')

let dom: any = null
const setFormConfig = (config: FormAttributeConfig) => {
  formAttributeConfig.layout = config.layout
  formAttributeConfig.labelAlign = config.labelAlign
}
const setFiledConfig = (config: any) => {
  const id = uuid()
  fieldAtttributeConfig.id = id
  fieldAtttributeConfig.type = config.type
  fieldAtttributeConfig.label = config.label
  fieldAtttributeConfig.labelWidth = config.labelWidth
  fieldAtttributeConfig.placeholder = config.placeholder
  fieldAtttributeConfig.vModel = config.vModel
  fieldAtttributeConfig.vModelAttribute = config.vModelAttribute
  formDesignConfig.form[config.vModelAttribute] = config.vModel
  formDesignConfig.formItems.push({
    id,
    ...config,
  })
}
const dragstart = (e) => {
  console.log('拖起')
  dom = e.currentTarget.cloneNode(true)
}
const allowDrop = (e) => {
  console.log('允许')

  e.preventDefault()
}
const drop = (e) => {
  console.log('放下')
  e.preventDefault()
  const node = e.target
  if (node) {
    // formAttributeConfig.form
    const arr = defaultformItems.filter((x) => x.type === 'phone')
    if (arr && arr.length > 0) {
      setFormConfig(defaultFormConfig)
      const defaultField = arr[0]
      setFiledConfig(defaultField)
    }

    // node.appendChild(dom)
  }
}
const prview = () => {
  previewDialogVisible.value = true
}
const reset = () => {
  formDesignConfig.form = {}
  formDesignConfig.formItems = []
}
const importJson = () => {
  importDialogVisible.value = true
}
const exportJson = () => {
  exportDialogVisible.value = true
  const { formItems } = formDesignConfig
  const options = {
    config: formAttributeConfig,
    formItems,
  }
  exportJsonContent.value = JSON.stringify(options, null, 8)
}

const handleOk = () => {
  formDesignConfig.formItems.length = 0
  const valueStr = importJsonContent.value
  const value = JSON.parse(valueStr)
  value.formItems.forEach((element: any) => {
    formDesignConfig.form[element.vModelAttribute] = element.vModel
  })
  const formItems = value.formItems.map((element: any) => {
    const el = { ...element }
    el.vModelAttribute = undefined
    return el
  })
  const config = value.config as FormAttributeConfig
  setFormConfig(config)
  // const formItem = formItems[0] as FormItem
  const formItem = formItems[0]
  setFiledConfig(formItem)
  importDialogVisible.value = false
}
const handleJsonCopy = () => {
  console.log('handleJsonCopy')
}
</script>
<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="basic-field">
          <div class="field-title">基础组件</div>
          <div class="control-wrap">
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>搜索栏</span>
            </div>
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>工具栏</span>
            </div>
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>表格</span>
            </div>
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>分页条</span>
            </div>
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>合计栏</span>
            </div>
          </div>
        </div>
        <div class="basic-field">
          <div class="field-title">布局组件</div>
          <div class="control-wrap">
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>普通</span>
            </div>
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>左树右表</span>
            </div>
            <div class="control" :draggable="true" @dragstart="dragstart">
              <el-icon style="vertical-align: middle" :size="20"
                ><Checked
              /></el-icon>
              <span>上主下子</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="toolbar">
          <el-button type="primary" @click="prview">预览</el-button>
          <el-button type="success" @click="reset">重置</el-button>
          <el-button type="info" @click="importJson">导入JSON</el-button>
          <el-button type="warning" @click="exportJson">导出JSON</el-button>
          <!-- <el-button type="danger" @click="exportJson">生成代码</el-button> -->
        </div>
        <div class="form-design" @drop="drop" @dragover="allowDrop">
          <quick-form
            :model="formDesignConfig.form"
            :form-items="formDesignConfig.formItems"
            :hidden-action="true"
          >
          </quick-form>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="attribute">
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="crud属性" name="first">
              <div class="wrap">
                <div class="item">
                  <div class="title">表单布局</div>
                  <div class="value">
                    <el-radio-group
                      v-model="formAttributeConfig.layout"
                      size="large"
                    >
                      <el-radio-button label="horizontal">水平</el-radio-button>
                      <el-radio-button label="vertical">垂直</el-radio-button>
                      <el-radio-button label="inline">内联</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <div class="item">
                  <div class="title">标签对齐方式</div>
                  <div class="value">
                    <el-radio-group
                      v-model="formAttributeConfig.labelAlign"
                      size="large"
                    >
                      <el-radio-button label="left">左对齐</el-radio-button>
                      <el-radio-button label="right">右对齐</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="组件属性" name="second">
              <div class="wrap">
                <div class="item">
                  <div class="title">标识</div>
                  <div class="value">
                    <el-input
                      v-model="fieldAtttributeConfig.id"
                      :readonly="true"
                    />
                  </div>
                </div>
                <div class="item">
                  <div class="title">类型</div>
                  <div class="value">
                    <el-input
                      v-model="fieldAtttributeConfig.type"
                      :readonly="true"
                    />
                  </div>
                </div>
                <div class="item">
                  <div class="title">标题</div>
                  <div class="value">
                    <el-input v-model="fieldAtttributeConfig.label" />
                  </div>
                </div>
                <div class="item">
                  <div class="title">label宽度</div>
                  <div class="value">
                    <el-input v-model="fieldAtttributeConfig.labelWidth" />
                  </div>
                </div>
                <div class="item">
                  <div class="title">占位符</div>
                  <div class="value">
                    <el-input v-model="fieldAtttributeConfig.placeholder" />
                  </div>
                </div>
                <div class="item">
                  <div class="title">值</div>
                  <div class="value">
                    <el-input v-model="fieldAtttributeConfig.vModel" />
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="importDialogVisible" title="导入JSON" width="30%">
      <div class="title">
        JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可
      </div>
      <div>
        <el-input
          v-model="importJsonContent"
          :rows="20"
          type="textarea"
          placeholder="Please input"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleOk"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="exportDialogVisible" title="导出JSON" width="30%">
      <div class="title">
        JSON格式如下，直接复制生成的json覆盖代码的配置项即可
      </div>
      <div>
        <el-input
          v-model="exportJsonContent"
          :rows="20"
          type="textarea"
          placeholder="Please input"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exportDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleJsonCopy"> 复制 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="previewDialogVisible" title="预览" width="50%">
      <quick-form
        :model="formDesignConfig.form"
        :form-items="formDesignConfig.formItems"
        :hidden-action="true"
      >
      </quick-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="previewDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleOk"> 确定 </el-button>
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
</style>
