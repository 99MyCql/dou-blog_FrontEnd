import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// element-ui 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// highlight.js代码高亮插件
import Highlight from './utils/highlight'; // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight);

// 将定义好的 router 作为全局Vue对象的一个属性，方便调用(this.$router)
import router from './router/router';

// 导入 store 作为全局Vue对象的一个属性
import store from './store/store'

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
