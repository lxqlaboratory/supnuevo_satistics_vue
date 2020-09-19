<template>
  <div class="query-container">
    <div  style="margin-top: 100px;width: 20%;height: 30px;padding: 20px;background-color: #20a0ff;color:white;font-size: 24px;text-align: center"  @click="doUpdate()">更  新</div>
  </div>
</template>

<script>
import { updateTradeDayData } from '@/api/price'

export default {
  name: 'updateTradeData',
  methods:{
    doUpdate() {
      updateTradeDayData().then(res => {

      })
    },
  },

}
</script>

<style scoped>

</style>
