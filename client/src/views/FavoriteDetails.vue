<template>
  <div v-if="data" class="recipe-details">
    <div class="recipe-header">
      <img :src="data.image" alt="Recipe Image" class="recipe-image" />
      <div class="recipe-info">
        <h1>{{ data.title }}</h1>
      </div>
    </div>
    
    <div class="recipe-content">
      <div v-if="data.summary" class="summary-section">
        <h2>Summary</h2>
        <div v-html="data.summary" class="summary-content"></div>
      </div>
      
      <div v-if="data.instructions" class="instructions-section">
        <h2>Instructions</h2>
        <div v-html="data.instructions" class="instructions-content"></div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Loading recipe details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { localApi } from '../api'

type RecipeDetails = {
  _id: string
  image: string
  title: string
  summary?: string
  instructions?: string
}

const route = useRoute()
const data = ref<RecipeDetails | null>(null)
const toast = useToast()

onMounted(async () => {
  const id = route.params.id as string
  try {
    const response = await localApi.getRecipe(id)
    data.value = response as unknown as RecipeDetails
  } catch (error) {
    toast.error('Failed to load recipe details')
    console.error('Error loading recipe:', error)
  }
})
</script>

<style scoped>
.recipe-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.recipe-header {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.recipe-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recipe-info h1 {
  color: #333;
  margin: 0;
  font-size: 2.5rem;
}

.recipe-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.summary-section,
.instructions-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.summary-section h2,
.instructions-section h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.summary-content,
.instructions-content {
  line-height: 1.6;
  color: #555;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .recipe-header {
    flex-direction: column;
  }
  
  .recipe-image {
    width: 100%;
    height: 250px;
  }
  
  .recipe-info h1 {
    font-size: 2rem;
  }
}
</style>
