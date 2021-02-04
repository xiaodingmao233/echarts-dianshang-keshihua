<template>
 <div class="com-container">
   <div class="com-chart" ref="hot_ref"></div>
   <span class="iconfont arr-left" @click="toLeft">&#xe6ef;</span>
   <span class="iconfont arr-right" @click="toRight">&#xe6ed;</span>
   <span class="cat-name">{{ catName }}</span>
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
      allData: null,
      currentIndex: 0
    }
  },
  computed: {
    catName () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, 'chalk')
      const initOption = {
        title: {
          text: '▍热销商品占比',
          top: 20,
          left: 20
        },
        legend: {
          top: 20,
          icon: 'circle'
        },
        tooltip: {
          formatter: arg => {
            const thirdCategory = arg.data.children
            // console.log(thirdCategory)
            let total = 0
            thirdCategory.forEach(item => {
              total += item.value
            })
            let retStr = ''
            thirdCategory.forEach(item => {
              retStr += `
              ${item.name}:${parseInt(item.value / total * 100) + '%'}
              <br/>
              `
            })
            return retStr
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    async getData () {
      const { data: res } = await this.$http.get('hotproduct')
      // console.log(res)
      this.allData = res
      this.updateChart()
    },
    updateChart () {
      const legendData = this.allData[this.currentIndex].children.map(item => {
        return item.name
      })
      const seriesData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children
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

    },
    toLeft () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.allData.length - 1
      } else {
      this.currentIndex--
      }
      this.updateChart()
    },
    toRight () {
      if (this.currentIndex === this.allData.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.updateChart()
    }
  }
}
</script>

<style scoped>
span {
  color: aliceblue;
}
.arr-left {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  cursor: pointer;
}
.arr-right {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  cursor: pointer;
}
.cat-name {
  position: absolute;
  bottom: 10%;
  right: 10%;
}
</style>
