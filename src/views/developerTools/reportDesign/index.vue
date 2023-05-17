<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import * as GC from '@grapecity/spread-sheets'
import '@grapecity/spread-sheets-vue'

const hostClass = ref('spread-host')
const initWorkbook = (spread: any) => {
  const sheet = spread.getSheet(0)
  const person = {
    name: 'Peter Winston',
    age: 25,
    gender: 'Male',
    address: { postcode: '10001' },
  }
  const source = new GC.Spread.Sheets.Bindings.CellBindingSource(person)
  sheet.setBindingPath(2, 2, 'name')
  sheet.setBindingPath(3, 2, 'age')
  sheet.setBindingPath(4, 2, 'gender')
  sheet.setBindingPath(5, 2, 'address.postcode')
  sheet.setDataSource(source)
}
</script>
<template>
  <div>
    <gc-spread-sheets
      :host-class="hostClass"
      @workbook-initialized="initWorkbook"
    >
    </gc-spread-sheets>
  </div>
</template>
<style>
.spread-host {
  width: 100%;
  height: 600px;
}
</style>
