import axios from './setting'

export const count_articles = () => {
  return axios.request({
    method: 'get',
    url: '/api/article/count'
  })
}

export const article_listByPage = (page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/article/listByPage',
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

export const article_findByTitle = (title) => {
  return axios.request({
    method: 'get',
    url: '/api/article/findByTitle',
    params: {
      title
    }
  })
}
