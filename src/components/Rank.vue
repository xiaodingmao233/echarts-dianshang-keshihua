<template>
 <div class="com-container">
   <div class="com-chart" ref="rank_ref"></div>
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
    this.getDate()
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs['rank_ref'], 'chalk')
      const initOption = {
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    async getDate () {
      const { data: res } = await this.$http.get('rank')
      // console.log(res)
      this.allData = res
      this.allData.sort((a, b) => {
        return b.value - a.value
      })
      this.updateChart()
    },
    updateChart () {
      const provinceArr = this.allData.map(item => {
        return item.name
      })
      const valueArr = this.allData.map(item => {
        return item.value
      })
      const dateOption = {
        xAxis: {
          data: provinceArr
        },
        series: [
          {
            data: valueArr
          }
        ]
      }
      this.chartInstance.setOption(dateOption)
    },
    screenAdapter () {}
  }
}
</script>

<style scoped>

</style>
