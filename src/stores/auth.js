import { defineStore } from 'pinia'
import { validateToken } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async initialize() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const isValid = await validateToken()
          if (isValid) {
            this.token = token
            this.isAuthenticated = true
          } else {
            this.clearToken()
          }
        } catch (error) {
          this.clearToken()
        }
      }
    },

    setToken(token) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
    },

    clearToken() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})