import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from '../services/api'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/login')
      return
    }
    
    try {
      const isValid = await validateToken()
      if (!isValid) {
        localStorage.removeItem('token')
        next('/login')
        return
      }
      next()
    } catch (error) {
      localStorage.removeItem('token')
      next('/login')
    }
  } else {
    next()
  }
})

export default router