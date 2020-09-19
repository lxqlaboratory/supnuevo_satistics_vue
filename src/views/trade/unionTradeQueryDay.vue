<template>
  <div class="app-container">
    <div class="query-container">
      联盟
      <el-select v-model.number="unionId" placeholder="请选择联盟" style="width: 10%;margin-right: 15px">
        <el-option
          v-for="item in unionList"
          :key="item.unionId"
          :label="item.unionName"
          :value="item.unionId"
        />
      </el-select>
      起止日期
      <el-date-picker
        v-model="startDay"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择开始日期"
      />
      <el-date-picker
        style="margin-left: 20px"
        v-model="endDay"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择结束日期"
      />
      <el-button type="primary" @click="doQuery()">查询</el-button>
    </div>

    <div :style="{width: '100%', height: 'auto',textAlign:'center',fontSize:'18px',fontWeight:'bold',padding:'40px' }">日交易量统计</div>

    <div id="myChart" :style="{ height: 'auto',minHeight:'950px'}" />
  </div>
</template>

<script>
import { unionPriceCurveView } from '@/api/price'
import { unionTradeDayDtataQuery } from '@/api/trade'


export default {
  name: 'unionTradeQueryDay',
  data() {
    return {
      unionId: '',
      commodityId: '',
      commodityName: '',
      startDay: '',
      endDay: '',
      unionList: [],
      commodityList: [],
      priceDays: [],
      dataList: [],
      loading:'false',
      list:[],
      amountList:[],
      xList:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      unionPriceCurveView().then(res => {
        this.unionList = res.unionList
      })
    },

    doQuery() {
      unionTradeDayDtataQuery({ 'unionId': this.unionId, 'startDay': this.startDay, 'endDay': this.endDay }).then(res => {
        this.datailList=res.datailList
        this.amountList = res.amountList
        this.xList = res.xList
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: [
          {
            type: 'category',
            data: this.xList,
            axisTick: {
              alignWithLabel: true
            },
            // axisLabel: {
            //   interval: 0,
            //   formatter:function(value)
            //   {
            //     return value.split("").join("\n");
            //   }
            // },
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售总量',
            type: 'bar',
            barWidth: '60%',
            data: this.amountList,
            itemStyle: {
              normal: {
                label: {
                  show: true, //是否显示
                  position: 'top',//显示在顶部
                  textStyle: {
                    color: 'black', //字体颜色
                    fontSize: 14 //字体大小
                  }
                }
              },
            },
          }
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 50
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
