import axios from 'axios';
import { Message } from 'element-ui';

// 添加响应拦截器
axios.interceptors.response.use(resp => {
  // 对响应数据做点什么
  let data = resp.data;
  console.log(data);
  if (data.code == 0 || data.code == 1)
    return resp;

  if (data.code == 2) {
    Message({
      message: '请先登录',
      type: 'error',
      showClose: true
    })
  }
  else if (data.code == 3) {
    Message({
      message: '莫得权限',
      type: 'error',
      showClose: true
    })
  }
  return Promise.reject(resp);
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});