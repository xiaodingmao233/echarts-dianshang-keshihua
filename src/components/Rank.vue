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
        title: {
          text: '▍地区销量排行',
          top: 20,
          left: 20
        },
        grid: {
          top: '40%',
          right: '5%',
          bottom: '5%',
          left: '5%',
          containLabel: true
        },
        tooltip: {
          show: true
        },
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
      const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]
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
            data: valueArr,
            itemStyle: {
              color: arg => {
                let targetColorArr = null
                if (arg.value > 300) {
                  targetColorArr = colorArr[0]
                } else if (arg.value >200) {
                  targetColorArr = colorArr[1]
                } else {
                  targetColorArr = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ])
              }
            }
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
