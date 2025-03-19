<template>
    <div class="login-container">
      <div class="auth-card">
        <h2 class="title">Welcome Back</h2>
        <div class="decorative-line"></div>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <input 
              v-model="form.username" 
              type="text" 
              required
              class="cyber-input"
            >
            <label class="input-label">Username</label>
            <span class="input-highlight"></span>
          </div>
          
          <div class="input-group">
            <input 
              v-model="form.password" 
              type="password" 
              required
              class="cyber-input"
            >
            <label class="input-label">Password</label>
            <span class="input-highlight"></span>
          </div>
  
          <button type="submit" class="cyber-button">
            <span class="glow-text">LOGIN</span>
            <span class="laser-line"></span>
          </button>
  
          <p v-if="errorMessage" class="error-message">
            ⚠️ {{ errorMessage }}
          </p>
  
          <router-link to="/register" class="register-link">
            Create New Account ➔
          </router-link>
        </form>
      </div>
      <div class="background-effect">
        <div class="gradient-circle pink"></div>
        <div class="gradient-circle blue"></div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { login } from '../services/api'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  username: '',
  password: ''
})
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await login(form.value)
    authStore.setToken(response.token)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '登录失败'
  }
}
</script scoped>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #0f0c29, #302b63, #24243e);
    position: relative;
    overflow: hidden;
  }
  
  .auth-card {
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    padding: 2.5rem 3rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 400px;
    z-index: 2;
    transform: translateY(0);
    animation: cardFloat 3s ease-in-out infinite;
  }
  
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .title {
    color: #fff;
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
  }
  
  .decorative-line {
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff, transparent);
    margin: 1.5rem 0;
  }
  
  .input-group {
    position: relative;
    margin: 2rem 0;
  }
  
  .cyber-input {
    width: 100%;
    padding: 1rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255,255,255,0.3);
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .cyber-input:focus {
    outline: none;
    border-bottom-color: #0ff;
    box-shadow: 0 4px 10px rgba(0, 255, 255, 0.2);
  }
  
  .input-label {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.6);
    pointer-events: none;
    transition: all 0.3s ease;
  }
  
  .cyber-input:focus ~ .input-label,
  .cyber-input:valid ~ .input-label {
    top: -10px;
    font-size: 0.8rem;
    color: #0ff;
  }
  
  .input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: #0ff;
    transition: all 0.3s ease;
  }
  
  .cyber-input:focus ~ .input-highlight {
    width: 100%;
  }
  
  .cyber-button {
    width: 100%;
    padding: 1rem;
    margin: 2rem 0;
    background: linear-gradient(45deg, #00ffff, #0066ff);
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .cyber-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.4);
  }
  
  .laser-line {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 2px;
    background: rgba(255,255,255,0.8);
    transform: skewX(-45deg);
    transition: all 0.3s;
  }
  
  .cyber-button:hover .laser-line {
    left: 150%;
  }
  
  .error-message {
    color: #ff4444;
    text-align: center;
    margin: 1rem 0;
    animation: shake 0.5s;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .register-link {
    display: block;
    text-align: center;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .register-link:hover {
    color: #0ff;
    transform: translateX(10px);
  }
  
  .background-effect {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  .gradient-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
  }
  
  .gradient-circle.pink {
    background: #ff0066;
    width: 300px;
    height: 300px;
    top: 20%;
    left: 20%;
  }
  
  .gradient-circle.blue {
    background: #0066ff;
    width: 250px;
    height: 250px;
    bottom: 20%;
    right: 20%;
  }

  </style>