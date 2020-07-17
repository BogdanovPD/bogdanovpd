import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import moment from 'moment';

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
