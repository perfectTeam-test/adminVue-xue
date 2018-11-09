import request from '@/utils/request'

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/api/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: '/api/postLogin',
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

// export function getUserInfo(token) {
//   return request({
//     url: 'api/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getOneUserInfo(id) {
  return request({
    url: 'api/user?userId=' + id,
    method: 'get'
  })
}

