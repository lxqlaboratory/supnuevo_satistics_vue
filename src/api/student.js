import request from '@/utils/request'

export function modefypassword(data) {
  return request({
    url: '/api/user/modifyPassword',
    method: 'POST',
    data
  })
}
