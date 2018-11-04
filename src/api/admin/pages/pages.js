import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/pages',
    method: 'get',
    params: query
  })
}

export function update(data) {
  return request({
    url: '/cms/pages/' + data.id,
    method: 'put',
    data: data
  })
}

export function store(data) {
  return request({
    url: '/cms/pages',
    method: 'post',
    data: data
  })
}
