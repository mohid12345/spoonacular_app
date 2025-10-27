import { ref, computed } from 'vue'

// Global reactive state for authentication
const user = ref<{ user: string; UserId: string } | null>(null)

// Initialize from localStorage
const initializeAuth = () => {
  const raw = localStorage.getItem('userData')
  if (raw) {
    try {
      user.value = JSON.parse(raw)
    } catch (error) {
      console.error('Error parsing user data:', error)
      localStorage.removeItem('userData')
    }
  }
}

// Initialize on module load
initializeAuth()

export const useAuth = () => {
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.user || 'Guest')
  const userId = computed(() => user.value?.UserId || null)

  const setUser = (userData: { user: string; UserId: string }) => {
    user.value = userData
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  const refreshAuth = () => {
    initializeAuth()
  }

  return {
    user: computed(() => user.value),
    isLoggedIn,
    userName,
    userId,
    setUser,
    clearUser,
    refreshAuth
  }
}
