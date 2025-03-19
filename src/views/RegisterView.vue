<template>
    <div class="register-container">
      <div class="auth-card">
        <h2 class="title">Create Account</h2>
        <div class="decorative-line"></div>
        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <input 
              v-model="form.username" 
              type="text" 
              required
              class="gold-input"
            >
            <label class="input-label">Username</label>
            <span class="input-highlight"></span>
          </div>
  
          <div class="input-group">
            <input 
              v-model="form.password" 
              type="password" 
              required
              class="gold-input"
            >
            <label class="input-label">Password</label>
            <span class="input-highlight"></span>
          </div>

          <div class="input-group">
            <input 
              v-model="form.email" 
              type="text" 
              required
              class="gold-input"
            >
            <label class="input-label">Email</label>
            <span class="input-highlight"></span>
          </div>

          <div class="input-group">
            <input 
              v-model="form.phoneNumber" 
              type="text" 
              required
              class="gold-input"
            >
            <label class="input-label">PhoneNumber</label>
            <span class="input-highlight"></span>
          </div>
  
          <button type="submit" class="royal-button">
            <span class="glow-text">REGISTER NOW</span>
            <div class="button-rays"></div>
          </button>
  
          <p v-if="errorMessage" class="error-message">
            ⚠️ {{ errorMessage }}
          </p>
  
          <router-link to="/login" class="login-link">
            Already have an account? ➔
          </router-link>
        </form>
      </div>
      <div class="background-rays"></div>
    </div>
  </template>
  
  <style scoped>
  .register-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #000428 0%, #004e92 100%);
    position: relative;
    overflow: hidden;
  }
  
  .auth-card {
    position: relative;
    background: rgba(0, 15, 32, 0.9);
    backdrop-filter: blur(15px);
    padding: 2.5rem 3rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 215, 0, 0.2);
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.1);
    width: 420px;
    z-index: 2;
    transform: perspective(1000px) rotateY(0deg);
    animation: cardGlow 4s ease-in-out infinite;
  }
  
  @keyframes cardGlow {
    0%, 100% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.1); }
    50% { box-shadow: 0 0 60px rgba(255, 215, 0, 0.3); }
  }
  
  .title {
    color: #ffd700;
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
    position: relative;
  }
  
  .decorative-line {
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 215, 0, 0.6) 50%, 
      transparent 100%
    );
    margin: 2rem 0;
  }
  
  .input-group {
    position: relative;
    margin: 2rem 0;
  }
  
  .gold-input {
    width: 100%;
    padding: 1rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 215, 0, 0.4);
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .gold-input:focus {
    outline: none;
    border-bottom-color: #ffd700;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
  }
  
  .input-label {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 215, 0, 0.6);
    pointer-events: none;
    transition: all 0.3s ease;
  }
  
  .gold-input:focus ~ .input-label,
  .gold-input:valid ~ .input-label {
    top: -10px;
    font-size: 0.8rem;
    color: #ffd700;
  }
  
  /* 防止自动填充破坏样式 */
  .gold-input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px linear-gradient(135deg, #000428 0%, #004e92 100%) inset;
  -webkit-text-fill-color: #ffd700;
  caret-color: #ffd700; /* 光标颜色 */
}
  .input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #004e92, #ffd700);
    transition: all 0.3s ease;
  }
  
  .gold-input:focus ~ .input-highlight {
    width: 100%;
  }
  
  .royal-button {
    width: 100%;
    padding: 1.2rem;
    margin: 2.5rem 0;
    background: linear-gradient(135deg, #004e92 0%, #ffd700 100%);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .royal-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 25px rgba(255, 215, 0, 0.4);
  }
  
  .button-rays {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-30deg);
    transition: all 0.6s;
  }
  
  .royal-button:hover .button-rays {
    left: 150%;
  }
  
  .error-message {
    color: #ff4444;
    text-align: center;
    margin: 1rem 0;
    animation: shake 0.5s;
  }
  
  .login-link {
    display: block;
    text-align: center;
    color: rgba(255, 215, 0, 0.7);
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .login-link:hover {
    color: #ffd700;
    transform: translateX(10px);
  }
  
  .background-rays {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(
      circle,
      rgba(0, 78, 146, 0.1) 0%,
      rgba(0, 15, 32, 0.8) 70%
    );
    animation: rayRotation 30s linear infinite;
    z-index: 1;
  }
  
  @keyframes rayRotation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }

  .dynamic-gradient {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    #000428 25%,
    #004e92 50%,
    #ffd700 75%
  );
  animation: gradientFlow 15s ease infinite;
  z-index: 0;
}

@keyframes gradientFlow {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: rotate(180deg) scale(1.5);
    opacity: 0.6;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.3;
  }
}

/* 调整原背景层叠关系 */
.register-container {
  position: relative;
  overflow: hidden;
}

.auth-card {
  /* 保持原有卡片样式 */
  position: relative;
  z-index: 2;
}

/* 增强输入框动效 */
.gold-input:focus {
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
}

/* 调整按钮渐变方向 */
.royal-button {
  background: linear-gradient(
    135deg,
    #004e92 0%,
    #ffd700 100%
  );
  background-size: 200% auto;
  animation: buttonShine 3s linear infinite;
}

@keyframes buttonShine {
  to {
    background-position: 200% center;
  }
}


  </style>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { register } from '../services/api'
  
  const router = useRouter()
  const form = ref({
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  })
  const errorMessage = ref('')
  
  const handleRegister = async () => {
    try {
      await register(form.value)
      router.push('/register')
    } catch (error) {
      errorMessage.value = error.response?.data || '注册失败'
    }
  }
  </script>