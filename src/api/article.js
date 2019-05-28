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

export const article_insert = (article) => {
  return axios.request({
    method: 'post',
    url: '/api/article/insert',
    date: article
  })
}

export const article_update = (article) => {
  return axios.request({
    method: 'post',
    url: '/api/article/update',
    date: article
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

export const article_findByArticleId = (articleId) => {
  return axios.request({
    method: 'get',
    url: '/api/article/findByArticleId',
    params: {
      articleId
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