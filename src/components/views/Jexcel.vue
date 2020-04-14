<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <!-- <div><input type="button" value="Add new row" @click="() => spreadsheet.insertRow()" /></div> -->
    <div>
      <button class="btn btn-primary tambah" @click="() => spreadsheet.insertRow()">Add row</button>
      <button class="btn btn-primary tambah" @click="() => spreadsheet.deleteRow()">Delete row</button>
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var host = 'http://10.199.14.46:8018/'
// var host = 'http://localhost:8010'

export default {
  data() {
    return {
      mahasiswa: [],
      form: {
        nrp: '',
        nama: '',
        angkatan: '',
        jk: '',
        lahir: '',
        ukt: '',
        foto: '',
        aktif: ''
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + '/api/mahasiswa/').then(res => {
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
            { type: 'text', title: 'NRP', width: '120px' },
            { type: 'text', title: 'Nama', width: '200px' },
            { type: 'text', title: 'Angkatan', width: '80px' },
            { type: 'dropdown', title: 'Jenis Kelamin', width: '120px', source: [ 'Laki-laki', 'Perempuan' ] },
            { type: 'calendar', title: 'Tanggal Lahir', width: '120px' },
            { type: 'numeric', title: 'UKT', width: '120px', mask: 'Rp #.##,00', decimal: ',' },
            { type: 'image', title: 'Photo', width: '120px' },
            { type: 'checkbox', title: 'Aktif', width: '80px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + '/api/mahasiswa/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + '/api/mahasiswa/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + '/api/mahasiswa/' + index[0], {
          id: index[0],
          nrp: index[1],
          nama: index[2],
          angkatan: index[3],
          jk: index[4],
          lahir: index[5],
          ukt: index[6],
          foto: index[7],
          aktif: index[8]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + '/api/mahasiswa').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + '/api/mahasiswa/' + index[0])
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
