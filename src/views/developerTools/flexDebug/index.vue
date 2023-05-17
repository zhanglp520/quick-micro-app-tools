<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'

const activeName = ref('first')
const exportDialogVisible = ref(false)
const exportJsonContent = ref('')
/**
 * 容器配置下拉框
 */
const directionOptions = [
  {
    label: 'row（默认值）：主轴为水平方向，起点在左端。',
    value: 'row',
  },
  {
    label: 'row-reverse主轴为水平方向，起点在右端。',
    value: 'row-reverse',
  },
  {
    label: 'column主轴为垂直方向，起点在上沿。',
    value: 'column',
  },
  {
    label: 'column-reverse主轴为垂直方向，起点在下沿。',
    value: 'column-reverse',
  },
]
const wrapOptions = [
  {
    label: 'nowrap（默认）：不换行。',
    value: 'nowrap',
  },
  {
    label: 'wrap：换行，第一行在上方。',
    value: 'wrap',
  },
  {
    label: 'wrap-reverse：换行，第一行在下方。',
    value: 'wrap-reverse',
  },
]
const justifyContentOptions = [
  {
    label: 'flex-start（默认值）：左对齐',
    value: 'flex-start',
  },
  {
    label: 'flex-end：右对齐',
    value: 'flex-end',
  },
  {
    label: 'center： 居中',
    value: 'center',
  },
  {
    label: 'space-between：两端对齐，项目之间的间隔都相等。',
    value: 'space-between',
  },
  {
    label:
      'space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。',
    value: 'space-around',
  },
]
const alignItemOptions = [
  {
    label:
      'stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。',
    value: 'stretch',
  },
  {
    label: 'flex-start：交叉轴的起点对齐。',
    value: 'flex-start',
  },
  {
    label: 'flex-end：交叉轴的终点对齐。',
    value: 'flex-end',
  },
  {
    label: 'center：交叉轴的中点对齐。',
    value: 'center',
  },
  {
    label: 'baseline: 项目的第一行文字的基线对齐。',
    value: 'baseline',
  },
]
const alignContentOptions = [
  {
    label: 'stretch（默认值）：轴线占满整个交叉轴。',
    value: 'stretch',
  },
  {
    label: 'flex-start：与交叉轴的起点对齐。',
    value: 'flex-start',
  },
  {
    label: 'flex-end：与交叉轴的终点对齐。',
    value: 'flex-end',
  },
  {
    label: 'center：与交叉轴的中点对齐。',
    value: 'center',
  },
  {
    label: 'space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。',
    value: 'space-between',
  },
  {
    label:
      'space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。',
    value: 'space-around',
  },
]
const alignsSelfOptions = [
  {
    label: '如果项目未设置高度或设为auto，将占满整个容器的高度。',
    value: 'auto',
  },
  {
    label:
      'stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。',
    value: 'stretch',
  },
  { label: 'flex-start：交叉轴的起点对齐。', value: 'flex-start' },
  { label: 'flex-end：交叉轴的终点对齐。', value: 'flex-end' },
  { label: 'center：交叉轴的中点对齐。', value: 'center' },
  { label: 'baseline: 项目的第一行文字的基线对齐。', value: 'baseline' },
]
/**
 * 容器属性
 */
const direction = ref('row')
const wrap = ref('nowrap')
const justifyContent = ref('flex-start')
const alignItem = ref('stretch')
const alignContent = ref('stretch')

interface ItemStyle {
  order: number
  grow: number
  shrink: number
  basis: number
  flex: string
  alignsSelf: string
}
interface ItemConfig {
  id: string
  name: string
  style: ItemStyle
}

/**
 * 项目属性
 */
const itemStyle = reactive<ItemStyle>({
  order: 0,
  grow: 0,
  shrink: 1,
  basis: 0,
  flex: '0 1 auto',
  alignsSelf: 'auto',
})
const itemConfig = reactive<ItemConfig>({
  id: '',
  name: '',
  style: itemStyle,
})
const dataList = ref<Array<ItemConfig>>([])
const itemClick = (item: ItemConfig) => {
  itemConfig.id = item.id
  itemConfig.name = item.name
  itemConfig.style = item.style
}
const add = () => {
  const id = uuid()
  const name = `item${dataList.value.length + 1}`
  const style: ItemStyle = {
    order: 0,
    grow: 0,
    shrink: 1,
    basis: 0,
    flex: '0 1 auto',
    alignsSelf: 'auto',
  }
  const config: ItemConfig = {
    id,
    name,
    style,
  }
  dataList.value.push(config)
  console.log('dataList', dataList.value)
}
const reset = () => {
  dataList.value = []
}
const exportJson = () => {
  exportDialogVisible.value = true
  const contentCss = `
  .content {
    flex-direction: ${direction.value};
    flex-wrap: ${wrap.value};
    justify-content: ${justifyContent.value};
    align-items: ${alignItem.value};
    align-content: ${alignContent.value};
  }
  `
  const itemCssList: any = []
  dataList.value.forEach((element) => {
    const itemCss = `
  .${element.name} {
    order: ${element.style.order};
    flex-grow: ${element.style.flexGrow};
    flex-shrink: ${element.style.flexShrink};
    flex-basis: ${element.style.flexBasis};
    flex: ${element.style.flex};
    align-self: ${element.style.alignSelf};
  }
  `
    itemCssList.push(itemCss)
  })
  exportJsonContent.value = `${contentCss + itemCssList.join('')}`
}
const handleJsonCopy = () => {
  console.log('handleJsonCopy')
}
</script>
<template>
  <div class="flex-wrap">
    <div class="left">
      <div class="toolbar">
        <el-button type="primary" @click="add">新增项目</el-button>
        <el-button type="success" @click="reset">重置</el-button>
        <el-button type="warning" @click="exportJson">导出样式</el-button>
      </div>
      <div class="design-wrap">
        <div
          class="content"
          :style="{
            flexDirection: direction,
            flexWrap: wrap,
            justifyContent: justifyContent,
            alignItems: alignItem,
            alignContent: alignContent,
          }"
        >
          <div
            v-for="(item, index) in dataList"
            :key="index"
            class="item"
            :style="item.style"
            @click="itemClick(item)"
          >
            {{ item.name }}
          </div>
          <!-- <div class="item">2222222</div>
        <div class="item">3333333</div> -->
        </div>
      </div>
    </div>
    <div class="attribute">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="容器属性（6个）" name="first">
          <div class="wrap">
            <div class="item">
              <div class="title">flex-direction</div>
              <div class="description">
                flex-direction属性决定主轴的方向（即项目的排列方向）。
              </div>
              <div class="value">
                <el-select v-model="direction">
                  <el-option
                    v-for="item in directionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="item">
              <div class="title">flex-wrap</div>
              <div class="description">
                flex-wrap属性，默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
              </div>
              <div class="value">
                <el-select v-model="wrap">
                  <el-option
                    v-for="item in wrapOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <!-- <div class="item">
              <div class="title">flex-flow</div>
              <div class="description">
                flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row
                nowrap。
              </div>
              <div class="value">
                <el-select v-model="direction">
                  <el-option
                    v-for="item in directionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select v-model="wrap">
                  <el-option
                    v-for="item in wrapOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div> -->
            <div class="item">
              <div class="title">justify-content</div>
              <div class="description">
                justify-content属性定义了项目在主轴上的对齐方式。
              </div>
              <div class="value">
                <el-select v-model="justifyContent">
                  <el-option
                    v-for="item in justifyContentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="item">
              <div class="title">align-items</div>
              <div class="description">
                align-items属性定义项目在交叉轴上如何对齐。
              </div>
              <div class="value">
                <el-select v-model="alignItem">
                  <el-option
                    v-for="item in alignItemOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="item">
              <div class="title">align-content</div>
              <div class="description">
                align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
              </div>
              <div class="value">
                <el-select v-model="alignContent">
                  <el-option
                    v-for="item in alignContentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目属性" name="second">
          <div class="wrap">
            <div class="item">
              <div class="title">标识</div>
              <div class="value">
                <el-input v-model="itemConfig.id" :readonly="true" />
              </div>
            </div>
            <div class="item">
              <div class="title">名称</div>
              <div class="value">
                <el-input v-model="itemConfig.name" />
              </div>
            </div>
            <div class="item">
              <div class="title">order</div>
              <div class="description">
                order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
              </div>
              <div class="value">
                <el-input-number v-model="itemConfig.style.order" :min="0" />
              </div>
            </div>
            <div class="item">
              <div class="title">flex-grow</div>
              <div class="description">
                flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
                如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
              </div>
              <div class="value">
                <el-input-number v-model="itemConfig.style.grow" :min="0" />
              </div>
            </div>
            <div class="item">
              <div class="title">flex-shrink</div>
              <div class="description">
                flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
                如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
                负值对该属性无效。
              </div>
              <div class="value">
                <el-input-number v-model="itemConfig.style.shrink" :min="1" />
              </div>
            </div>
            <div class="item">
              <div class="title">flex-basis</div>
              <div class="description">
                flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main
                size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
                它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
              </div>
              <div class="value">
                <el-input-number v-model="itemConfig.style.basis" :min="0" />
              </div>
            </div>
            <div class="item">
              <div class="title">flex</div>
              <div class="description">
                flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0
                1 auto。后两个属性可选。 该属性有两个快捷值：auto (1 1 auto) 和
                none (0 0 auto)。
                建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
              </div>
              <div class="value">
                <el-input v-model="itemConfig.style.flex" />
              </div>
            </div>
            <div class="item">
              <div class="title">align-self</div>
              <div class="description">
                align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
                该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
              </div>
              <div class="value">
                <el-select v-model="itemConfig.style.alignsSelf">
                  <el-option
                    v-for="item in alignsSelfOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog v-model="exportDialogVisible" title="导出样式" width="30%">
      <div class="title">CSS格式如下，直接复制生成的CSS即可</div>
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
  </div>
</template>

<style lang="scss">
.flex-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.toolbar {
  text-align: right;
  margin-right: 20px;
}
.design-wrap {
  margin-top: 10px;
  margin-right: 10px;
  background: #fff;
  border: 1px dashed #999;
  width: 1024px;
  height: 500px;
  // padding: 30px;
  .content {
    display: flex;
    flex-wrap: wrap;
    height: 500px;
    overflow: scroll;
    justify-content: center;
    align-items: center;
    align-content: center;
    .item {
      width: 100px;
      height: 100px;
      background: #409eff;
      color: #fff;
      text-align: center;
      margin: 10px;
      line-height: 100px;
      border-radius: 10px;
      transition: all 0.5s;
      cursor: pointer;
      opacity: 1;
    }
    .item:hover {
      // transform: scale(1.2);
      // opacity: 0.3;
    }
  }
}
.attribute {
  .wrap {
    .item {
      .title {
        margin-left: 10px;
      }
      .description {
        margin-left: 10px;
        margin-top: 10px;
        font-size: 14px;
        color: #999;
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
