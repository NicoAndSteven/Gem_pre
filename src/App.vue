<template>
  <div id="app">
    <nav v-if="$route.name !== 'login' && $route.name !== 'register'">
      <button @click="handleLogout">退出登录</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.clearToken()
  router.push('/login')
}
</script>