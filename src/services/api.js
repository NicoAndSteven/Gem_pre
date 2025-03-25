import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // 替换为您的后端API地址
  timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 验证token
export const validateToken = async () => {
  try {
    const response = await api.get('/auth/validate')
    return response.data.valid
  } catch (error) {
    return false
  }
}

// 登录
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

// 注册
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export default api