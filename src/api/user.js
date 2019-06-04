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

export const user_listAll = (page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/user/listAll',
    params: {
      page,
      size
    }
  })
}

export const user_delete = (id) => {
  return axios.request({
    method: 'get',
    url: '/api/user/delete',
    params: {
      id
    }
  })
}

export const user_findByName = (name) => {
  return axios.request({
    method: 'get',
    url: '/api/user/findByName',
    params: {
      name
    }
  })
}