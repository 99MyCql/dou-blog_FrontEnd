import axios from 'axios'

// 允许跨域携带cookie
// axios.defaults.withCredentials = true;

export const user_login = (name, passwd) => {
  return axios.request({
    method: 'get',
    url: '/api/user/login',
    params: {
      name,
      passwd
    }
  })
}

export const user_register = (name, password) => {
  return axios.request({
    method: 'post',
    url: '/api/user/register',
    data: {
      name,
      password
    }
  })
}