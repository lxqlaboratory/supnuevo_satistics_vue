<template>
  <div class="app-container">
         <div class="query-container" >
        联盟
        <el-select v-model.number="unionId" placeholder="请选择联盟"  style="width: 10%;">
          <el-option
            v-for="item in unionList"
            :key="item.unionId"
            :label="item.unionName"
            :value="item.unionId">
          </el-option>
        </el-select>
        商品类型
        <el-select v-model="taxType" placeholder="请选择商品类型" @change="getTaxIdList()" style="width: 10%;">
          <el-option
            v-for="item in taxTypeList"
            :key="item.type"
            :label="item.type"
            :value="item.type" >
          </el-option>
        </el-select>
        <el-select v-model.number="taxId"  placeholder="请选择种类" @change="getCommodityList()" style="width: 10%;">
          <el-option
            v-for="item in taxIdList"
            :key="item.taxId"
            :label="item.taxId+'-'+item.taxName"
            :value="item.taxId">
          </el-option>
        </el-select>
        <el-select v-model.number="commodityId"  placeholder="请选择条码"  style="width: 10%;">
          <el-option
            v-for="item in commodityList"
            :key="item.commodityId"
            :label="item.codigo+'-'+item.commodityName"
            :value="item.commodityId">
          </el-option>
        </el-select>
        商品名称
         <el-input v-model="commodityName" placeholder="请输入商品名称"  style="width: 8%;" />
        起止日期
        <el-date-picker
          v-model="startDay"
          type="datetime"
          value-format="yyyyMMdd"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="endDay"
          type="datetime"
          value-format="yyyyMMdd"
          placeholder="选择结束日期">
        </el-date-picker>
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
      <div id="myChart" :style="{width: '1600px', height: '800px'}"></div>
  </div>
</template>

<script>
  import { unionPriceCurveView } from '@/api/price'
  import { unionPriceCurveViewQuery } from '@/api/price'
  import { unionPriceCurveViewTaxIdList } from '@/api/price'
  import { unionPriceCurveViewCommodityList } from '@/api/price'
  
  export default {
    name: "unionPriceCurveView",
    data() {
      return {
      unionId:'',
      taxType: '',
      taxId:'',
      commodityId: '',
      commodityName: '',
      startDay:'',
      endDay:'',
      unionList: [],
      taxTypeList:[],
      taxIdList:[],
      commodityList:[],
      priceDays: [],
      dataList: [],
     }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        unionPriceCurveView().then(res => {
          this.unionList = res.unionList
          this.taxTypeList = res.taxTypeList
          this.taxIdList = res.taxIdList
        })
      },
      getTaxIdList() {
        unionPriceCurveViewTaxIdList({ 'taxType': this.taxType}).then(res => {
        this.taxIdList = res.taxIdList
        })
      },
      getCommodityList() {
        unionPriceCurveViewCommodityList({  'unionId': this.unionId,'taxId': this.taxId}).then(res => {
        this.commodityList = res.commodityList
        })
      },
      doQuery() {
        unionPriceCurveViewQuery({'unionId':this.unionId, 'taxType': this.taxType,
        'taxId':this.taxId, 'commodityId': this.commodityId, 'commodityName':this.commodityName,
        'startDay':this.startDay, 'endDay': this.endDay}).then(res => {
          this.priceDays= res.priceDays;
          this.dataList = res.dataList;
          this.drawLine();
        })
      },
      drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: { text: '联盟商品价格趋势' },
            tooltip: {},
            xAxis: {
              data: this.priceDays
            },
            yAxis: {},
            series: this.dataList
          });
        },
    }
  }
</script>

<style scoped>

</style>
