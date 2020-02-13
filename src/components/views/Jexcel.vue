<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <!-- <div><input type="button" value="Add new row" @click="() => spreadsheet.insertRow()" /></div> -->
    <div><b-button variant="danger" @click="() => spreadsheet.insertRow()">Add new row</b-button></div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
var data = [
  ['05111740000091', 'Affan Ahsanul Habib', '2017', '1999-02-11', '', true]
]
var options = {
  data: data,
  // allowToolbar:true,
  columns: [
    { type: 'Numeric', title: 'NRP', width: '200px' },
    { type: 'text', title: 'Nama', width: '200px' },
    { type: 'Numeric', title: 'Angkatan', width: '100px' },
    { type: 'calendar', title: 'Tgl Lahir', width: '200px' },
    { type: 'image', title: 'Photo', width: '300px' },
    { type: 'checkbox', title: 'Aktif', width: '80px' }
  ]
}
export default {
  name: 'App',
  mounted: function () {
    let spreadsheet = jexcel(this.$el, options)
    Object.assign(this, { spreadsheet })
  }
}
</script>
