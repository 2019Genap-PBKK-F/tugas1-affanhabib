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
var dropdownDataDasar = host + 'api/data-dasar/nama/'
var dropdownAspek = host + 'api/aspek/nama/'

export default {
  // name: 'App',
  data() {
    return {
      masterIndikator: [],
      form: {
        id_aspek: 1,
        nama: 'New Data',
        deskripsi: 'New Data',
        default_bobot: 0.0
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/master-indikator/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'id', width: '10px' },
            { type: 'dropdown', title: 'Aspek', url: dropdownAspek, width: '100px' },
            { type: 'dropdown', title: 'Pembilang', url: dropdownDataDasar, width: '150px' },
            { type: 'dropdown', title: 'Penyebut', url: dropdownDataDasar, width: '150px' },
            { type: 'text', title: 'Nama', width: '200px' },
            { type: 'text', title: 'Deskripsi', width: '200px' },
            { type: 'text', title: 'Default Bobot', width: '100px' },
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
      axios.post(host + 'api/master-indikator/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/master-indikator/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/master-indikator/' + index[0], {
          id: index[0],
          id_aspek: index[1],
          id_pembilang: index[2],
          id_penyebut: index[3],
          nama: index[4],
          deskripsi: index[5],
          default_bobot: index[6],
          create_date: index[7],
          last_update: index[8],
          expired_date: index[9]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/master-indikator/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/master-indikator/' + index[0])
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
