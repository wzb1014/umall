// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './filters/index'
import './store/index'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components'
Vue.use(ElementUI);


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
