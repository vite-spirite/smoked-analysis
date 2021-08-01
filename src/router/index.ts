import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Analysis from '@/views/Analysis.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/analysis',
    name: "nowAnalysis",
    redirect: {name: 'Analysis', params: {key: `${(new Date().getUTCMonth()+1 < 10)?('0'):('')}${new Date().getUTCMonth()+1}-${new Date().getUTCFullYear()}`}}
  }, {
    path: '/analysis/:key',
    name: 'Analysis',
    component: Analysis
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
