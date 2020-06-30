import axios from './setting'

export const count_users = () => {
  return axios.request({
    method: 'get',
    url: '/api/user/count'
  })
}

export const user_login = (name, password) => {
  return axios.request({
    method: 'get',
    url: '/api/user/login',
    params: {
      name,
      password
    }
  })
}

export const user_logout = () => {
  return axios.request({
    method: 'get',
    url: '/api/user/logout'
  })
}

export const user_register = (username, password) => {
  return axios.request({
    method: 'post',
    url: '/api/user/register',
    data: {
      username,
      password
    }
  })
}

export const user_listByPage = (page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/user/listByPage',
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

export const user_getInfo = () => {
  return axios.request({
    method: 'get',
    url: '/api/user/getInfo'
  })
}

export const user_update = (user) => {
  return axios.request({
    method: 'post',
    url: '/api/user/updateInfo',
    data: user
  })
}