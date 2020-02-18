<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <!-- <div><input type="button" value="Add new row" @click="() => spreadsheet.insertRow()" /></div> -->
    <div><button class="btn btn-primary tambah" @click="() => spreadsheet.insertRow()">Add row</button>
    <button class="btn btn-primary tambah" @click="() => spreadsheet.deleteRow()">Delete row</button></div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var changed = function(instance, cell, x, y, value) {
  x = parseInt(x)
  y = parseInt(y)
  var datatemp = []
  datatemp[0] = y + 1
  axios.get('http://localhost:3000/mahasiswa/' + datatemp[0]).then((response) => {
    Object.keys(response.data).map(function (key) {
      if (key === 'nama') {
        datatemp[2] = response.data['nama']
      }
      if (key === 'nrp') {
        datatemp[1] = response.data['nrp']
      }
      if (key === 'angkatan') {
        datatemp[3] = response.data['angkatan']
      }
      if (key === 'jenis_kelamin') {
        datatemp[4] = response.data['jenis_kelamin']
      }
      if (key === 'tgl_lahir') {
        datatemp[5] = response.data['tgl_lahir']
      }
      if (key === 'photo') {
        datatemp[6] = response.data['photo']
      }
      if (key === 'aktif') {
        datatemp[7] = response.data['aktif']
      }
    })
    datatemp[x] = value
    axios({
      method: 'put',
      url: 'http://localhost:3000/mahasiswa/' + datatemp[0],
      data: {
        id: datatemp[0],
        nrp: datatemp[1],
        nama: datatemp[2],
        angkatan: datatemp[3],
        jenis_kelamin: datatemp[4],
        tgl_lahir: datatemp[5],
        photo: datatemp[6],
        aktif: datatemp[7]
      }
    }).then((response) => {
      console.log(response.data)
    })
  })
}

var insertrow = function(instance) {
  axios({
    method: 'post',
    url: 'http://localhost:3000/mahasiswa/',
    data: {
    }
  }).then((response) => {
    console.log(response.data)
  })
}

var deleterow = function(instance, id) {
  var tes
  console.log(id)
  axios({
    method: 'get',
    url: 'http://localhost:3000/mahasiswa/',
    data: {
    }
  }).then((response) => {
    tes = Object.keys(response.data[id]).map(function (key) {
      return response.data[id][key]
    })
    axios.delete('http://localhost:3000/mahasiswa/' + tes[0])
  })
}

var options = {
  url: 'http://localhost:3000/mahasiswa',
  onchange: changed,
  oninsertrow: insertrow,
  ondeleterow: deleterow,
  allowToolbar: true,
  columns: [
    { type: 'hidden', title: 'id', width: '120px' },
    { type: 'text', title: 'NRP', width: '120px' },
    { type: 'text', title: 'Nama', width: '120px' },
    { type: 'text', title: 'Angkatan', width: '120px' },
    { type: 'dropdown', title: 'Jenis Kelamin', width: '250px', autocomplete: true, source: ['Laki-Laki', 'Perempuan'] },
    { type: 'calendar', title: 'Tgl Lahir', width: '250px' },
    { type: 'image', title: 'Photo', width: '120px' },
    { type: 'checkbox', title: 'Aktif', width: '80px' }
    // { type: 'Numeric', title: 'NRP', width: '200px' },
    // { type: 'text', title: 'Nama', width: '200px' },
    // { type: 'Numeric', title: 'Angkatan', width: '100px' },
    // { type: 'calendar', title: 'Tgl Lahir', width: '200px' },
    // { type: 'image', title: 'Photo', width: '300px' },
    // { type: 'checkbox', title: 'Aktif', width: '80px' }
  ]
}

export default {
  name: 'App',
  mounted: function () {
    this.load()
  },
  methods: {
    load() {
      let spreadsheet = jexcel(this.$el, options)
      Object.assign(this, { spreadsheet })
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
