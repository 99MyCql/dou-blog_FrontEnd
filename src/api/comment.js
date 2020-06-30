import axios from './setting'

export const count_comments = () => {
  return axios.request({
    method: 'get',
    url: '/api/comment/count'
  })
}

export const comment_listByPage = (page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/comment/listByPage',
    params: {
      page,
      size
    }
  })
}

export const comment_insert = (comment) => {
  return axios.request({
    method: 'post',
    url: '/api/comment/insert',
    data: comment
  })
}

export const comment_delete = (id) => {
  return axios.request({
    method: 'get',
    url: '/api/comment/delete',
    params: {
      id
    }
  })
}

export const comment_listByArticleId = (articleId, page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/comment/listByArticleId',
    params: {
      articleId,
      page,
      size
    }
  })
}