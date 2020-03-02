import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

// eslint-disable-next-line no-unused-vars
import auth from './auth';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
