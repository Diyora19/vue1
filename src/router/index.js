import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Team from '../views/Team.vue'
import Projects from '../views/Projects.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  },
  {
    path: '/news/viewNew/:slug',
    name: 'viewNew',
    component: () => import('../views/viewNew.vue')
  },
  
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '//show/:slug',
    name: 'show',
    component: () => import('../views/show.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
]

const router = new VueRouter({
  routes
})

export default router
