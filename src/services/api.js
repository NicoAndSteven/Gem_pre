import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/gem', // 根据后端实际端口调整
  withCredentials: true
})

export const login = (credentials) => 
  api.post('/login', credentials).then(res => res.data)

export const register = (userData) => 
  api.post('/register', userData).then(res => res.data)

// 添加请求拦截器携带token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api