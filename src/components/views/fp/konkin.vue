<template>
  <div>
    <div>
        <select v-model="selected" class='form-control' @change="onChange($event)">
          <option v-for="data in fkSatker" v-bind:value="data.id">
            {{ data.nama }}
          </option>
        </select>
    </div>
    <div><img src="https://www.its.ac.id/wp-content/uploads/2019/02/Badge_ITS.png" alt="its logo" width="100" height="100" style="float: left">
      <div id="text">
        <div style="font-size:24px">KONTRAK KINERJA TAHUN 2020</div>
        <div style="font-size:20px">Kepala Departemen {{ selected }}</div>
      </div>
    </div>
    <div id="spreadsheet" ref="spreadsheet"></div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'
var host = 'http://10.199.14.46:8018/'
// var host = 'http://127.0.0.1:8010/'

export default {
  // name: 'App',
  data() {
    return {
      selected: '',
      dataIndikator: [],
      filterSatker: [],
      fkSatker: [],
      dataDasar: [],
      form: {
        nama: 'New Data'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/satuan-kerja/name').then(res => {
        console.log(res.data)
        this.fkSatker = Object.values(res.data)
      })
      axios.get(host + 'api/konkin/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          editable: false,
          columns: [

            { type: 'text', title: 'aspek', width: '120px' },
            { type: 'text', title: 'komponen aspek', width: '120px' },
            { type: 'text', title: 'indikator kinerja', width: '360px' },
            { type: 'text', title: 'bobot', width: '120px' },
            { type: 'text', title: 'target', width: '200px' },
            { type: 'text', title: 'capaian', width: '200px' }
          ]
        }
        let spreadsheet = jexcel(document.getElementById('spreadsheet'), jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    onChange(event) {
      console.log(event.target.value)
      document.getElementById('spreadsheet').innerHTML = ''
      axios.get(host + 'api/konkin/' + event.target.value).then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          editable: false,
          columns: [

            { type: 'text', title: 'aspek', width: '120px' },
            { type: 'text', title: 'komponen aspek', width: '120px' },
            { type: 'text', title: 'indikator kinerja', width: '360px' },
            { type: 'text', title: 'bobot', width: '120px' },
            { type: 'text', title: 'target', width: '200px' },
            { type: 'text', title: 'capaian', width: '200px' }
          ]
        }
        let spreadsheet = jexcel(document.getElementById('spreadsheet'), jexcelOptions)
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
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/indikator-satuan-kerja/' + index[0], {
          id: index[0],
          id_indikator_periode: index[1],
          id_satker: index[2],
          bobot: index[3],
          target: index[4],
          capaian: index[5]
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
        axios.delete(host + 'api/indikator-satuan-kerja/' + index[0])
      })
    }
  }
}
</script>
<style>
  #text {
    padding-top: 20px;
  }

  img {
    margin-right: 10px;
  }
</style>
