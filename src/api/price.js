import request from '@/utils/request'

export function unionPriceCurveView() {
  return request({
    url: '/price/unionPriceCurveView',
    method: 'POST',
    data: {}
  })
}
export function unionPriceCurveViewQuery(data) {
  return request({
    url: '/price/unionPriceCurveViewQuery',
    method: 'POST',
    data
  })
}
export function unionPriceCurveViewTaxIdList(data) {
  return request({
    url: '/price/unionPriceCurveViewTaxIdList',
    method: 'POST',
    data
  })
}
export function unionPriceCurveViewCommodityList(data) {
  return request({
    url: '/price/unionPriceCurveViewCommodityList',
    method: 'POST',
    data
  })
}

export function getAllSuitableCommodity(data) {
  return request({
    url: '/price/getAllSuitableCommodity',
    method: 'POST',
    data
  })
}

export function updateTradeDayData() {
  return request({
    url: '/price/updateTradeDayData',
    method: 'POST',
    data:{}
  })
}

