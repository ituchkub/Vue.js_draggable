import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

import Login from "./pages/Login.vue"
import Home from './pages/Main.vue'

Vue.use(require('vue-cookies'))
const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home },
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueCookies, { expires: '5d' })
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.config.productionTip = false;
Vue.use(BootstrapVue)


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

