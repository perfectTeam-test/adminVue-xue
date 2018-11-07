import request from '@/utils/request'
// let base = 'http://dev-mysite.com'

export function saveRechargeByUser(data) {
  return request({
    url: `/api/balance/saveRechargeByUser`,
    method: 'post',
    data: data
  })
}

