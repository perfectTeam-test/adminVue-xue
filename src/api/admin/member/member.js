import request from '@/utils/request'
// let base = 'http://dev-mysite.com'

export function getUserInfoById(data) {
  return request({
    url: `/api/member/info?userId=` + data.userId + '&envName=' + data.envName,
    method: 'get'
  })
}

