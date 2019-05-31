import axios from 'axios'

// 允许跨域携带cookie
// axios.defaults.withCredentials = true;

export const article_listAll = (page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/article/listAll',
    params: {
      page,
      size
    }
  })
}

export const article_submit = (article) => {
  return axios.request({
    method: 'post',
    url: '/api/article/submit',
    data: article
  })
}

export const article_insert = (article) => {
  return axios.request({
    method: 'post',
    url: '/api/article/insert',
    data: article
  })
}

export const article_update = (article) => {
  return axios.request({
    method: 'post',
    url: '/api/article/update',
    data: article
  })
}

export const article_delete = (id) => {
  return axios.request({
    method: 'get',
    url: '/api/article/delete',
    params: {
      id
    }
  })
}

export const article_findByArticleTitle = (articleTitle) => {
  return axios.request({
    method: 'get',
    url: '/api/article/findByArticleTitle',
    params: {
      articleTitle
    }
  })
}

export const article_findById = (id) => {
  return axios.request({
    method: 'get',
    url: '/api/article/findById',
    params: {
      id
    }
  })
}