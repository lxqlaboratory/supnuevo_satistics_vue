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
<!--      商品类型-->
<!--      <el-select v-model="taxType" placeholder="请选择商品类型" style="width: 10%;" @change="getTaxIdList()">-->
<!--        <el-option-->
<!--          v-for="item in taxTypeList"-->
<!--          :key="item.type"-->
<!--          :label="item.type"-->
<!--          :value="item.type"-->
<!--        />-->
<!--      </el-select>-->
<!--      <el-select v-model.number="taxId" placeholder="请选择种类" style="width: 10%;" @change="getCommodityList()">-->
<!--        <el-option-->
<!--          v-for="item in taxIdList"-->
<!--          :key="item.taxId"-->
<!--          :label="item.taxId+'-'+item.taxName"-->
<!--          :value="item.taxId"-->
<!--        />-->
<!--      </el-select>-->
      条码
      <el-select
        style="width: 20%;margin-right: 15px"
        v-model="codigoSelected"
        filterable
        remote
        reserve-keyword
        placeholder="请输入商品后四位条码"
        :remote-method="searchCodigo"
        :loading="loading"
        @change="addCommodityByCodigo()"
      >
        <el-option
          v-for="item in codiigoComList"
          :key="item.commodityId"
          :label="item.codigo+'-'+item.commodityName"
          :value="item.commodityId">
        </el-option>
      </el-select>
<!--      <el-input v-model="codigo" placeholder="请输入商品后四位条码" style="width: 8%;margin-right: 10px" @keyup.enter.native="searchCodigo()"/>-->
<!--      <el-select v-model="codigo" placeholder="请选择条码" style="width: 10%;margin-right: 10px">-->
<!--        <el-option-->
<!--          v-for="item in commodityList"-->
<!--          :key="item.commodityId"-->
<!--          :label="item.codigo+'-'+item.commodityName"-->
<!--          :value="item.commodityId"-->
<!--        />-->
<!--      </el-select>-->
      商品名称
      <el-select
        v-model="nameSelected"
        style="width: 20%;margin-right: 10px"

        filterable
        remote

        popper-append-to-body=false
        placeholder="请输入商品名称"
        :remote-method="searchName"
        :loading="loading"
        @change="addCommodityByName()"
      >
        <el-option
          v-for="item in nameComList"
          :key="item.commodityId"
          :label="item.codigo+'-'+item.commodityName"
          :value="item.commodityId">
        </el-option>
      </el-select>

    </div>
    <div  class="query-container" style="margin-top: 30px">
      起止日期
      <el-date-picker
        v-model="startDay"
        type="datetime"
        value-format="yyyyMMdd"
        placeholder="选择开始日期"
      />
      <el-date-picker
        style="margin-left: 20px"
        v-model="endDay"
        type="datetime"
        value-format="yyyyMMdd"
        placeholder="选择结束日期"
      />
<!--      <el-button type="primary" @click="doQuery()">查询</el-button>-->
    </div>
    <div :style="{width: '100%', height: 'auto',textAlign:'center',fontSize:'18px',fontWeight:'bold',padding:'40px' }">联盟商品价格趋势</div>
    <div>

      <el-checkbox-group
        v-model="checkedCommodity"
        @change="selectedChange"
        >
        <el-checkbox border v-for="item in commodityList" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div id="myChart" :style="{width: '1600px', height: 'auto',minHeight:'950px'}" />
  </div>
</template>

<script>
import { unionPriceCurveView } from '@/api/price'
import { unionPriceCurveViewQuery } from '@/api/price'
import { unionPriceCurveViewTaxIdList } from '@/api/price'
import { unionPriceCurveViewCommodityList } from '@/api/price'
import { getAllSuitableCommodity } from '@/api/price'

export default {
  name: 'UnionPriceCurveView',
  data() {
    return {
      unionId: '',
      taxType: '',
      taxId: '',
      commodityId: '',
      commodityName: '',
      nameComList:[],
      codiigoComList:[],
      nameSelected:'',
      codigoSelected:'',
      codigo:'',
      startDay: '',
      endDay: '',
      unionList: [],
      taxTypeList: [],
      taxIdList: [],
      commodityList: [],
      checkedCommodity:[],
      priceDays: [],
      dataList: [],
      legendList: [],
      loading:'false',
      list:[],
      minY:10000,
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
        this.legendList = res.legendList
      })
    },
    getTaxIdList() {
      unionPriceCurveViewTaxIdList({ 'taxType': this.taxType }).then(res => {
        this.taxIdList = res.taxIdList
      })
    },
    getCommodityList() {
      unionPriceCurveViewCommodityList({ 'unionId': this.unionId, 'taxId': this.taxId }).then(res => {
        this.commodityList = res.commodityList
      })
    },
    addCommodityByCodigo(){
      this.commodityList.push(this.codigoSelected)
    },
    addCommodityByName(){
        this.commodityList.push(this.nameSelected)
    },
    selectedChange(){
      this.dataList=[]
      myChart.removeAttribute("_echarts_instance_");
      console.log(this.checkedCommodity)
      for(var i=0;i<this.checkedCommodity.length;i++){
        unionPriceCurveViewQuery({ 'unionId': this.unionId, 'commodityId': this.checkedCommodity[i], 'commodityName': this.commodityName,
          'startDay': this.startDay, 'endDay': this.endDay }).then(res => {
          this.priceDays = res.priceDays
          var list=res.dataList
          this.dataList.push(list[0])
          var minPrice=res.minPrice
          if(minPrice<this.minY){
            var a=minPrice/10
            this.minY= Math.floor(a)*10
          }
          this.drawLine()
        })
      }
    },
    searchName(name){
      if (name.length>2) {
        this.loading = true;
        getAllSuitableCommodity({ 'unionId': this.unionId, 'commodityName': name,'codigo':this.codigo }).then(res => {
          this.nameComList = res.commodityList
          this.loading = false;
        })

      } else {
        this.nameComList = [];
      }
    },
    searchCodigo(input){
      if (input.length>3 && input.length<5) {
        this.loading = true;
        getAllSuitableCommodity({ 'unionId': this.unionId, 'commodityName': this.commodityName,'codigo':input }).then(res => {
          this.codiigoComList = res.commodityList
          this.loading = false;
        })

      } else {
        this.codiigoComList = [];
      }

    },
    doQuery() {
      unionPriceCurveViewQuery({ 'unionId': this.unionId, 'commodityId': this.commodityId, 'commodityName': this.commodityName,
        'startDay': this.startDay, 'endDay': this.endDay }).then(res => {
        this.priceDays = res.priceDays
        this.dataList = res.dataList
        var minPrice=res.minPrice
        var a=minPrice/10
        this.minY= Math.floor(a)*10
        this.drawLine()
      })
    },
    drawLine() {
      console.log(this.dataList)
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          // text: '联盟商品价格趋势'
        },
        tooltip: {},
        // legend: {
        //   data: this.legendList,
        // },
        xAxis: {
          data: this.priceDays
        },
        yAxis: {
          type: 'value',
          min: this.minY
        },
        series: this.dataList
      })
    }
  }
}
</script>

<style scoped>

</style>
