<template>
    <div>
        <h2>Your Favorites recipe</h2>
        <div v-if="data && data.length > 0" class="main">
            <div class="container" v-for="recipe in data" :key="recipe._id">
                <RouterLink :to="`/favorite/${recipe._id}`">
                    <img :src="recipe.image" alt="" />
                </RouterLink>
                <h3>{{ recipe.title }}</h3>
                <p v-html="shortSummary(recipe.summary)"></p>
                <p v-html="shortSummary(recipe.instructions)"></p>
                <button class="delete_btn" @click="handleDelete(recipe._id)">Delete</button>
            </div>
        </div>
        <div v-else class="empty">
            <img src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { localApi } from "../api";

// type Fav = {
//     _id: string;
//     image: string;
//     title: string;
//     summary: string;
//     instructions: string;
// };
type Fav = {
    _id: string;
    image: string;
    title: string;
    summary: string;
    instructions: string;
    readyInMinutes?: number;
    servings?: number;
    cuisines?: string[];
    diets?: string[];
    dishTypes?: string[];
    UserId?: string;
};

const data = ref<Fav[]>([]);
const toast = useToast();

async function getData() {
    try {
        const response = await localApi.getRecipes();
        data.value = response as any as Fav[];
    } catch (error: any) {
        toast.error("Failed to fetch favorite recipes");
        console.error("Error fetching recipes:", error);
    }
}

async function handleDelete(id: string) {
    try {        
        await localApi.deleteRecipe(id as any);
        data.value = data.value.filter((x) => x._id !== id);
        toast.success("Recipe deleted successfully");
    } catch (error: any) {
        toast.error("Failed to delete recipe");
        console.error("Error deleting recipe:", error);
    }
}

// Helper function for summary
const shortSummary = (summary: string) => {
    const div = document.createElement("div");
    div.innerHTML = summary;
    const textContent = div.textContent || div.innerText || "";
    return textContent.length > 100 ? textContent.slice(0, 100) + "..." : textContent;
};

onMounted(() => {
    getData();
});
</script>
