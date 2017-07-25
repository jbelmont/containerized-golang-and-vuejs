import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/Index.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  data: {
    showModal: false
  },
  template: '<App/>',
  components: {
    App
  }
})
