<template>
 <div class="com-container">
   <div class="com-chart" ref="hot_ref"></div>
 </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      chartInstance: null,
      allData: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref)
      const initOption = {
        series: [
          {
            type: 'pie'
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    async getData () {
      const { data: res } = await this.$http.get('hotproduct')
      console.log(res)
      this.allData = res
      this.updateChart()
    },
    updateChart () {
      const legendData = this.allData[0].children.map(item => {
        return item.name
      })
      const seriesData = this.allData[0].children.map(item => {
        return {
          name: item.name,
          value: item.value
        }
      })
      const dataOption = {
        legend: {
          name:legendData
        },
        series: [
          {
            data: seriesData
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {

    }
  }
}
</script>

<style scoped>

</style>
