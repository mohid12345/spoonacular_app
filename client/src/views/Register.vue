<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="handleSubmit">
      <h2>Register</h2>
      <div class="form-group">
        <input type="text" id="name" v-model="name" placeholder="Name" required />
      </div>
      <div class="form-group">
        <input type="email" id="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" placeholder="Password" required />
      </div>
      <button class="button-reg" type="submit">Register</button>
      <div class="redirect">
        <p>Already User</p>
        <RouterLink style="color: #e16868;" to="/login">Login</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { localApi } from '../api'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

async function handleSubmit() {
  try {
    const data = { user: name.value, email: email.value, password: password.value }
    const response = await localApi.register(data)
    toast.success(response.msg)
    router.push('/login')
  } catch (error: any) {
    toast.error(error.response?.data?.msg || 'Registration failed')
  }
  
  name.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style>
button {
  background-color: #e16868;
  color: #e16868;
}
.button-reg {
  background-color: #e16868;
  color: #e16868;
}

</style>

