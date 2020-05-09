<template>
    <div>The component will appear here</div>
</template>

<script>
import WebDataRocks from 'webdatarocks'
export default {
  props: {
    afterchartdraw: Function,
    aftergriddraw: Function,
    beforegriddraw: Function,
    beforetoolbarcreated: Function,
    cellclick: Function,
    celldoubleclick: Function,
    componentFolder: String,
    customizeCell: Function,
    customizeContextMenu: Function,
    datachanged: Function,
    dataerror: Function,
    datafilecancelled: Function,
    dataloaded: Function,
    fieldslistclose: Function,
    fieldslistopen: Function,
    filterclose: Function,
    filteropen: Function,
    fullscreen: Function,
    global: Object,
    height: [String, Number],
    loadingdata: Function,
    loadinglocalization: Function,
    loadingolapstructure: Function,
    loadingreportfile: Function,
    localizationerror: Function,
    localizationloaded: Function,
    olapstructureerror: Function,
    olapstructureloaded: Function,
    openingreportfile: Function,
    querycomplete: Function,
    queryerror: Function,
    ready: Function,
    report: [String, Object],
    reportchange: Function,
    reportcomplete: Function,
    reportfilecancelled: Function,
    reportfileerror: Function,
    reportfileloaded: Function,
    runningquery: Function,
    toolbar: Boolean,
    update: Function,
    width: [Number, String]
  },
  mounted: function() {
    this.webdatarocks = new WebDataRocks({
      container: this.$el,
      toolbar: true,
      height: 1000,
      report: {
        dataSource: {
          dataSourceType: 'json',
          filename: 'http://localhost:8010/api/penelitian'
        },
        options: {
          grid: {
            title: 'Penelitian',
            type: 'flat',
            showTotals: 'off',
            showGrandTotals: 'off'
          }
        }
      }
    })
  },
  beforeUpdate() {
    return false
  }
//   var pivot = new WebDataRocks({
//     container: "#wdr-component",
//     toolbar: true,
//     height: 395,
//     report: {
//     dataSource: {
//       filename: "https://cdn.webdatarocks.com/data/data.csv"
//     }
//   }
// });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~webdatarocks/webdatarocks.min.css';
</style>
