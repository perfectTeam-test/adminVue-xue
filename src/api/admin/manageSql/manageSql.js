import request from '@/utils/request'
// let base = 'http://dev-mysite.com'

export function getManageSqlList() {
  return request({
    url: `/api/manage/index`,
    method: 'get'
  })
}
export function getDataBySql(data) {
  return request({
    url: `/api/manage/getsqldata`,
    method: 'post',
    data: data
  })
}

