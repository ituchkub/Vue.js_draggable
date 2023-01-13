import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterPath from './router_path'


Vue.use(VueRouter)

/* eslint-disable */
const routes = []

for (let i = 0; i < RouterPath.setpath.length; i++) {
  if (checkHam(RouterPath.setpath[i].Rolemenu)) {
    const data = {
      path: RouterPath.setpath[i].path,
      name: RouterPath.setpath[i].title.toString(),
      redirect: RouterPath.setpath[i].redirect,
      component: () => import('../pages/' + RouterPath.setpath[i].file)
    }
    routes.push(data)
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function checkHam(Rolemenu) {
  let c = false;
  let user = null;
  let tempUser = sessionStorage.getItem('userInfo')

  if (tempUser !== null) {
    user = JSON.parse(tempUser)
  } else {
    user = null
  }
  if (user != null) {
    if (user.RoleId >= Rolemenu) {
      c = true
    }
    c = true
  } else {
    c = true
  }
  return c;
}

export default router
