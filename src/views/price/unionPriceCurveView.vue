<template>
  <div class="app-container">
         <div class="query-container" >
        联盟
        <el-select v-model.number="unionId" placeholder="请选择联盟"  style="width: 15%;">
          <el-option
            v-for="item in unionList"
            :key="item.unionId"
            :label="item.unionName"
            :value="item.unionId">
          </el-option>
        </el-select>
        商品类型
        <el-select v-model="taxType" placeholder="请选择商品类型" @change="getTaxIdList()" style="width: 15%;">
          <el-option
            v-for="item in taxTypeList"
            :key="item.type"
            :label="item.type"
            :value="item.type" >
          </el-option>
        </el-select>
        <el-select v-model.number="taxId"  placeholder="请选择种类"  style="width: 15%;">
          <el-option
            v-for="item in taxIdList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        商品条码
        <el-select v-model="codigo"  placeholder="请选择商品条码"  style="width: 10%;">
          <el-option
            v-for="item in codigoList"
            :key="item.codigo"
            :label="item.commodityName"
            :value="item.codigo">
          </el-option>
        </el-select>
        商品名称
         <el-input v-model="commodityName" placeholder="请输入商品名称"  style="width: 10%;" />
        <el-button  type="primary" @click="doQuery()"  >查询</el-button>
      </div>
  </div>
</template>

<script>
  import { unionPriceCurveView } from '@/api/price'
  import { unionPriceCurveViewQuery } from '@/api/price'
  import { unionPriceCurveViewTaxIdList } from '@api/price'
  export default {
    name: "unionPriceCurveView",
    data() {
      return {
      unionId:'',
      taxType: '',
      taxId:'',
      codigo: '',
      commodityName: '',
      unionList: [],
      taxTypeList:[],
      taxIdList:[],
      codigoList: [],
      dataList: [],
     }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        unionPriceCurveView({ 'session': document.cookie }).then(res => {
          this.unionList = res.unionList
          this.taxTypeList = res.taxTypeList
          this.taxIdList = res.taxIdList
        })
      },
      getTaxIdList() {
        unionPriceCurveViewTaxIdList({ 'session': document.cookie, 'taxType': this.taxType}).then(res => {
        this.taxIdList = res.taxIdList
        })
      },
      doQuery() {
        unionPriceCurveViewQuery({ 'session': document.cookie,'unionId':this.unionId, 'taxType': this.taxType,
        'taxId':this.taxId, 'codigo': this.codigo, 'commodityName':this.commodityName}).then(res => {
        this.dataList = res.data
        })
      },
    }
  }
</script>

<style scoped>

</style>
