import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from 'vue-router'

import Login from "./pages/Login.vue"
import Home from './pages/Main.vue'


const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
]

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

