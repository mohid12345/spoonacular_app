<template>
  <nav class="navbar">
    <!-- Left Side: Brand Name and Filter Toggle -->
    <div class="navbar-left">
      
      <div @click="navigateTo('/')" class="navbar-brand">
        MyFoodRecipe
      </div>
    </div>

    <!-- Right Side: User Dropdown -->
    <div class="dropdown-container" @mouseenter="showDropdown = true" @mouseleave="handleMouseLeave">

      <img src="https://img.icons8.com/?size=250&id=20749&format=png&color=000000" alt="User Logo" class="user-img" />

      <div v-if="isLoggedIn" class="profile-dropdown">
        <!-- <div class="center_profile"> -->
          <span class="dropdown-button">{{ userName }}</span>
        <!-- </div> -->
        <div v-if="showDropdown" class="dropdown-content" @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false">
          <button class="dropdown-item" @click="navigateTo('/fav_recipe')">Wishlist</button>
          <button class="dropdown-item" @click="logout">Logout</button>
        </div>
      </div>
      <button v-else class="login-button" @click="navigateTo('/login')">Login</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

// Props
// interface Props {
//   isFilterOpen?: boolean;
// }

// const props = withDefaults(defineProps<Props>(), {
//   isFilterOpen: false
// });

// Emits
const emit = defineEmits<{
  'update:isFilterOpen': [value: boolean];
}>();

const showDropdown = ref(false);
const router = useRouter();

// Use the auth composable
const { isLoggedIn, userName, clearUser } = useAuth();

const navigateTo = (path: string) => {
  router.push(path);
};

const logout = () => {
  clearUser();
  alert('logout success');
  router.push('/');
};

const handleMouseLeave = () => {
  showDropdown.value = false;
};


</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background-color: #fddfdf;
  border-radius: 10px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter-icon {
  font-size: 16px;
}

.filter-text {
  font-weight: 500;
}

.navbar-brand {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #e16868;
}

.dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.center_profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-content {
  position: absolute;
  width: 12rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #e16868;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.login-button {
  background-color: #ea9595;
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #e16868;
}

.dropdown-button {
  color: #e16868;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 768px) {
  .navbar {
    flex-direction: column; 
    gap: 15px;
  }
  
  .navbar-left {
    flex-direction: column;
    gap: 10px;
  }
  
  .dropdown-container {
    flex-direction: column;
    gap: 10px;
  }
}
</style>