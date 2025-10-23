<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>User Login</h2>
      <div class="form-group">
        <input type="email" id="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
      <div class="redirect">
        <p>New User</p>
        <RouterLink style="color: #e16868;" to="/register">Sign Up</RouterLink>
      </div>
    </form>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { localApi } from '../api'

const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

async function handleSubmit() {
  try {
    const data = { email: email.value, password: password.value }
    const response = await localApi.login(data)
    
    if (response.token) {
      toast.success(response.msg)
      router.push('/')
    } else {
      toast.error(response.msg)
    }
  } catch (error: any) {
    toast.error(error.response?.data?.msg || 'Login failed')
  }
  
  email.value = ''
  password.value = ''
}
</script>

