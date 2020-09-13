import request from '@/utils/request'

export function unionPriceCurveView() {
  return request({
    url: '/price/unionPriceCurveView',
    method: 'POST',
    data:{}
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


