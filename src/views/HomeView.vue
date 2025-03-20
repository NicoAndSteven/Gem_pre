<template>
  <div class="cyber-container">
    <!-- 动态背景 -->
    <div class="cyber-background"></div>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 用户信息板块 -->
      <div class="user-panel">
        <div class="avatar-section">
          <div class="avatar-glow">
            <img src="https://example.com/avatar.png" class="user-avatar" alt="用户头像">
          </div>
          <div class="user-meta">
            <h1 class="username">CYBER_VOYAGER</h1>
            <div class="digital-clock">{{ currentTime }}</div>
          </div>
        </div>

        <!-- 个人数据卡 -->
        <div class="data-card">
          <div class="card-header">
            <h2>PROFILE DATA</h2>
            <div class="cyber-divider"></div>
          </div>
          <div class="data-grid">
            <div class="data-item">
              <span class="data-label">IDENTITY</span>
              <span class="data-value">CYBER_VOYAGER</span>
            </div>
            <div class="data-item">
              <span class="data-label">EMAIL</span>
              <span class="data-value">encrypted@neoet.sec</span>
            </div>
            <div class="data-item">
              <span class="data-label">REGISTERED</span>
              <span class="data-value">03/20/2025, 17:45:07</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷操作面板 -->
      <div class="action-panel">
        <h2 class="panel-title">QUICK ACTIONS</h2>
        <div class="button-group">
          <button class="cyber-button blue" @click="navigateTo('/settings')">
            SYSTEM SETTINGS
            <div class="button-glow"></div>
          </button>
          <button class="cyber-button purple" @click="navigateTo('/profile')">
            EDIT PROFILE
            <div class="button-glow"></div>
          </button>
          <button class="cyber-button red" @click="handleLogout">
            DISCONNECT
            <div class="button-glow"></div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const currentTime = ref('')

    const updateTime = () => {
      currentTime.value = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    onMounted(() => {
      setInterval(updateTime, 1000)
      updateTime()
    })

    return {
      currentTime,
      handleLogout: () => {
        localStorage.clear()
        router.push('/login')
      },
      navigateTo: router.push
    }
  }
}
</script>

<style scoped>
/* 基础样式 */
.cyber-container {
  min-height: 100vh;
  background: #0a0a16;
  color: #fff;
  padding: 2rem;
}

/* 动态背景 */
.cyber-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 50% 50%, 
      rgba(108,0,255,0.1) 0%, 
      rgba(108,0,255,0) 70%),
    linear-gradient(45deg, 
      rgba(10,10,30,1) 0%, 
      rgba(20,20,50,1) 100%);
  z-index: -1;
}

/* 用户信息板块 */
.user-panel {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.avatar-glow {
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00f3ff, #6c00ff);
  animation: glow-pulse 2s infinite alternate;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1);
}

.username {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  background: linear-gradient(45deg, #00f3ff, #6c00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.digital-clock {
  font-family: 'Segment7', monospace;
  color: #00f3ff;
  font-size: 1.2rem;
  opacity: 0.8;
}

/* 数据卡片 */
.data-card {
  background: rgba(16, 16, 32, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(8px);
}

.cyber-divider {
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(0,243,255,0) 0%, 
    #00f3ff 50%, 
    rgba(0,243,255,0) 100%);
  margin: 1rem 0;
}

.data-grid {
  display: grid;
  gap: 1.5rem;
}

.data-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.data-label {
  color: #00f3ff;
  font-size: 0.9rem;
}

.data-value {
  font-family: 'Roboto Mono', monospace;
  color: rgba(255,255,255,0.9);
}

/* 操作面板 */
.action-panel {
  max-width: 800px;
  margin: 0 auto;
}

.panel-title {
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Orbitron', sans-serif;
  color: #6c00ff;
}

.button-group {
  display: grid;
  gap: 1.5rem;
}

.cyber-button {
  position: relative;
  padding: 1.2rem;
  background: rgba(16,16,32,0.8);
  border: 1px solid;
  border-radius: 8px;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  transition: 0.3s;
  overflow: hidden;
}

.cyber-button.blue {
  border-color: #00f3ff;
}

.cyber-button.purple {
  border-color: #6c00ff;
}

.cyber-button.red {
  border-color: #ff0066;
}

.button-glow {
  position: absolute;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, 
    rgba(0,243,255,0.3) 0%, 
    transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.cyber-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0,243,255,0.2);
}

.cyber-button:hover .button-glow {
  opacity: 0.6;
}

@keyframes glow-pulse {
  0% { box-shadow: 0 0 10px #00f3ff; }
  100% { box-shadow: 0 0 30px #6c00ff; }
}
</style>