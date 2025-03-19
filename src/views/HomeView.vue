<template>
    <div class="home-container">
      <nav class="app-nav">
        <h1 class="logo">My App</h1>
        <div class="user-info">
          <span>{{ userData.username }}</span>
          <button @click="handleLogout" class="logout-btn">登出</button>
        </div>
      </nav>
  
      <main class="content">
        <h2>欢迎回来, {{ userData.username }}!</h2>
        
        <div class="dashboard-cards">
          <div class="card">
            <h3>个人资料</h3>
            <p>邮箱: {{ userData.email || '未设置' }}</p>
            <p>注册时间: {{ formattedDate }}</p>
          </div>
  
          <div class="card">
            <h3>快捷操作</h3>
            <button @click="navigateTo('/settings')" class="action-btn">账户设置</button>
            <button @click="navigateTo('/profile')" class="action-btn">编辑资料</button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default defineComponent({
    name: 'HomeView',
    
    setup() {
      const router = useRouter()
  
      // 用户数据响应式对象
      const userData = reactive({
        username: '加载中...',
        email: undefined,
        registeredAt: undefined
      })
  
      // 计算属性格式化日期
      const formattedDate = computed(() => {
        if (!userData.registeredAt) return '未知时间'
        return new Date(userData.registeredAt).toLocaleDateString()
      })
  
      // 加载用户数据
      const loadUserData = () => {
        const storedData = localStorage.getItem('userData')
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          Object.assign(userData, parsedData)
        }
      }
  
      // 登出处理
      const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        router.push('/login')
      }
  
      // 导航方法
      const navigateTo = (path) => {
        router.push(path)
      }
  
      // 组件挂载时检查认证
      onMounted(() => {
        if (!localStorage.getItem('token')) {
          router.replace('/login')
        }
        loadUserData()
      })
  
      return {
        userData,
        formattedDate,
        handleLogout,
        navigateTo
      }
    }
  })
  </script>
  
  <style scoped>
  /* 保持原有样式不变 */
  .home-container {
    min-height: 100vh;
    background-color: #f5f6fa;
  }
  
  .app-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .logo {
    color: #2d3436;
    margin: 0;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .logout-btn {
    padding: 0.5rem 1rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .logout-btn:hover {
    opacity: 0.9;
  }
  
  .content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  .dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .action-btn {
    display: block;
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .action-btn:hover {
    opacity: 0.9;
  }
  </style>