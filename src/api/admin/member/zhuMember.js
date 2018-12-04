import request from '@/utils/request'
// let base = 'http://dev-mysite.com'

export function getUserInfoById(data) {
  return request({
    url: `/api/zhuMember/info?phone_number=` + data.phone_number + '&envName=' + data.envName,
    method: 'get'
  })
}

