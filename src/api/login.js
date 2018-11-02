// import request from '@/utils/request'
// let base = 'http://localhost:8090'
//
// export function loginByUsernametest(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: `${base}/api/postLogin`,
//     method: 'get'
//   })
// }
// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }
//
// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//

import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/login/login',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'api/user/info',
    method: 'get',
    params: { token }
  })
}

export function getOneUserInfo(id) {
  return request({
    url: 'api/user/' + id,
    method: 'get'
  })
}

