import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import moment from 'moment';
import VueRouter from 'vue-router';
import router from './routes';
import {store} from './store';

Vue.use(VueRouter);

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
