import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Quiz from '../views/Quiz.vue'
import Debug from '../views/Debug.vue'
import References from '../views/References.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/references',
    name: 'References',
    component: References,
  },
  {
    path: '/debug',
    name: 'Debug',
    component: Debug,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
