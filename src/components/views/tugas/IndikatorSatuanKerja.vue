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
var dropdownSatuanKerja = host + 'api/satuan-kerja/nama/'
var dropdownMasterIndikator = host + 'api/master-indikator/nama/'
var dropdownPeriode = host + 'api/periode/nama/'

export default {
  // name: 'App',
  data() {
    return {
      indikatorSatker: [],
      form: {
        id_periode: 2020,
        id_master: 19,
        id_satker: 'cek',
        bobot: 0.0,
        target: 0.0,
        capaian: 0.0
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/indikator-satuan-kerja/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'dropdown', title: 'Periode', url: dropdownPeriode, width: '120px' },
            { type: 'dropdown', title: 'Master Indikator', url: dropdownMasterIndikator, width: '300px' },
            { type: 'dropdown', title: 'Satker', url: dropdownSatuanKerja, width: '300px' },
            { type: 'text', title: 'Bobot', width: '75px' },
            { type: 'text', title: 'Target', width: '75px' },
            { type: 'text', title: 'Capaian', width: '75px' },
            { type: 'text', title: 'Last Update', width: '120px', readOnly: true }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/indikator-satuan-kerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/indikator-satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        // console.log(index)
        console.log(old[0] + ' ' + old[1] + ' ' + old[2])
        console.log(index[0] + ' ' + index[1] + ' ' + index[2])
        axios.put(host + 'api/indikator-satuan-kerja/' + old[0] + '&' + old[1] + '&' + old[2], {
          id_periode: index[0],
          id_master: index[1],
          id_satker: index[2],
          bobot: index[3],
          target: index[4],
          capaian: index[5],
          last_update: index[6]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/indikator-satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/indikator-satuan-kerja/' + index[0] + '&' + index[1] + '&' + index[2])
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
