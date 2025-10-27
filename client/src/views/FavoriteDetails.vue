<template>
  <div v-if="data">
    <img :src="data.image" alt="Recipe Image" />
    <h3>{{ data.title }}</h3>
    <p v-html="data.summary"></p>
    <p v-if="data.instructions" v-html="data.instructions"></p>
  </div>
  <div v-else>
    <p>Loading...</p>
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
  const response = await localApi.getRecipes()
    const recipes = response.data as unknown as RecipeDetails[]
    const recipe = recipes.find((r) => r._id === id)
    if (recipe) {
      data.value = recipe
    } else {
      toast.error('Recipe not found')
    }
  } catch (error) {
    toast.error('Failed to load recipe details')
    console.error('Error loading recipe:', error)
  }
})
</script>
