import request from '@/utils/request'

export function unionTradeDayDtataQuery(data) {
  return request({
    url: '/price/unionTradeDayDtataQuery',
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

