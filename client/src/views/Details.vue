<template>
  <div v-if="data">
    <img :src="data.image" alt="Recipe Image" />
    <h3>{{ data.title }}</h3>
    <p v-html="data.summary"></p>
    <p v-if="data.instructions" v-html="data.instructions"></p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

type RecipeDetails = {
  id: number
  image: string
  title: string
  summary?: string
  instructions?: string
}

const route = useRoute()
const data = ref<RecipeDetails | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  const apiKey = import.meta.env.VITE_SPOON_KEY
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
  const res = await fetch(apiUrl)
  data.value = await res.json()
})
</script>

