<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input class="btn btn-primary tambah" type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input class="btn btn-primary tambah" type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var host = 'http://10.199.14.46:8018/'
// var host = 'http://localhost:8010/'
var dropdownJenisSatker = host + 'api/jenis-satker/nama/'
var dropdownSatuanKerja = host + 'api/satuan-kerja/nama/'

export default {
  // name: 'App',
  data() {
    return {
      masterIndikator: [],
      form: {
        id: 'aff',
        id_jns_satker: 1,
        id_induk_satker: 'aff',
        nama: 'New Data'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/satuan-kerja/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'text', title: 'id', width: '75px' },
            { type: 'dropdown', title: 'Jenis Satker', url: dropdownJenisSatker, width: '150px' },
            { type: 'dropdown', title: 'Induk Satker', url: dropdownSatuanKerja, width: '150px' },
            { type: 'text', title: 'Nama', width: '150px' },
            { type: 'text', title: 'Email', width: '50px' },
            { type: 'text', title: 'Create Date', width: '160px', readOnly: true },
            { type: 'text', title: 'Last Update', width: '160px', readOnly: true },
            { type: 'text', title: 'Expired Date', width: '160px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/satuan-kerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        console.log(old[0])
        console.log(index[0])
        axios.put(host + 'api/satuan-kerja/' + old[0], {
          id: index[0],
          id_jns_satker: index[1],
          id_induk_satker: index[2],
          nama: index[3],
          email: index[4],
          create_date: index[5],
          last_update: index[6],
          expired_date: index[7]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/satuan-kerja/' + index[0])
      })
    }
  }
}
</script>
<style>
  .tambah {
    margin-top: 10pt;
    margin-bottom: 10pt;
    margin-left: 10pt;
    }
</style>
