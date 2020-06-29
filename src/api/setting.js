import axios from 'axios';
import VUE from '../main';

const SUCCESS_CODE = 0;   // 成功
const ERROR_CODE = 1;     // 出现错误
const FAIL_CODE = 2;      // 失败
const NOT_LOG_CODE = 3;   // 未登录

// 后端返回数据示例
// const exmple = {
//   code: SUCCESS_CODE,
//   msg: "success",
//   data: "{username:dounine}"
// }

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('request.url:', config.url);
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

// 添加响应拦截器，对响应信息作处理
axios.interceptors.response.use(resp => {
  let data = resp.data; // 获取后端返回的数据
  console.log('response.data:', data);

  // 如果响应状态码表示不成功
  if (data.code === ERROR_CODE || data.code === FAIL_CODE) {
    // 显示后端返回的异常信息
    VUE.$message({
      showClose: true,
      message: data.msg,
      type: 'error'
    });
    return Promise.reject(resp); // 转由.catch()接收
  }
  // 如果响应状态码为成功
  else if (data.code === SUCCESS_CODE) {
    return resp; // 转由.then()接收
  } else if (data.code === NOT_LOG_CODE) {
    VUE.$message({
      showClose: true,
      message: '未登录',
      type: 'waring'
    });
    VUE.$options.store.clearStateAction();     // 清除全局缓存
    VUE.$router.push('/');
  }
}, error => {
  // 对响应错误(通常是HTPP错误)做点什么
  VUE.$message({
    showClose: true,
    message: "something error",
    type: 'error'
  });

  // 已经显示错误信息了，不需要再交付给.catch()
  return Promise.reject(error); // 转由.catch()接收
});

export default axios;