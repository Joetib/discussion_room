import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import AddTopic from '../views/AddTopic.vue'
import EditTopic from '../views/EditTopic.vue'
import TopicDetail from '../views/TopicDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addtopic',
    name: 'AddTopic',
    component: AddTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'EditTopic',
    component: EditTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/topic/:id',
    name: 'TopicDetail',
    component: TopicDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: {
      guest: true
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }

  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token')) {
      next({
        path: '/'
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
