import axios from 'axios'

export const comment_listAll = (page, size) => {
  return axios.request({
    method: 'get',
    url: '/api/comment/listAll',
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
    // "articleId": 0,
    // "commentContent": "string",
    // "commentDate": "string",
    // "commenterId": 0,
    // "likes": 0,
    // "parent_id": 0
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

export const comment_findById = (id) => {
  return axios.request({
    method: 'get',
    url: '/api/comment/findById',
    params: {
      id
    }
  })
}

export const comment_listByArticleId = (articleId) => {
  return axios.request({
    method: 'get',
    url: '/api/comment/listByArticleId',
    params: {
      articleId
    }
  })
}