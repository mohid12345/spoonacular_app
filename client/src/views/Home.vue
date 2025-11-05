<template>
    <div class="home-container">
        <!-- Filter Navbar -->
        <FilterNavbar
            v-model:is-open="isFilterOpen"
            @filters-changed="handleFiltersChanged"
            @apply-filters="handleApplyFilters"
        />

        <!-- Overlay for mobile -->
        <div v-if="isFilterOpen" class="filter-overlay" @click="isFilterOpen = false"></div>
        <div class="search-wrapper">
            <div class="search-scope">
                <form @submit.prevent="handleSearch">
                    <div class="fx fx-gap">
                        <div>
                            <input type="text" placeholder="Search recipe..." required v-model="searchQuery" />
                        </div>
                        <div id="search-icon">
                            <button type="submit">
                                <div id="search-icon-circle"></div>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="content-area">
                <div class="subcontainer-heading">
                    <h2>Search Results</h2>
                    <button
                        id="filter-button"
                        @click="toggleFilter"
                        class="filter-toggle-btn"
                        :class="{ active: isFilterOpen }"
                    >
                        <span class="filter-icon">☰</span>
                        <span class="filter-text">Filters</span>
                    </button>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center">
                    <!-- Show skeleton loaders when loading -->
                    <template v-if="isLoading">
                        <div v-for="n in 6" :key="`skeleton-${n}`" class="item skeleton-card" style="width: 309px">
                            <ContentLoader viewBox="0 0 309 400">
                                <rect x="0" y="0" rx="8" ry="8" width="309" height="200" />
                                <rect x="10" y="230" rx="4" ry="4" width="280" height="36" />
                                <rect x="10" y="285" rx="3" ry="3" width="280" height="20" />
                                <rect x="10" y="315" rx="3" ry="3" width="280" height="20" />
                                <rect x="10" y="345" rx="3" ry="3" width="280" height="20" />
                                <rect x="100" y="375" rx="6" ry="6" width="80" height="30" />
                            </ContentLoader>
                        </div>
                    </template>

                    <!-- Show actual recipe cards when not loading -->
                    <template v-else>
                        <div v-for="recipe in recipes" :key="recipe.id" class="item" style="width: 309px">
                            <RouterLink :to="`/${recipe.id}`">
                                <img width="123" :src="recipe.image" alt="Recipe Image" />
                            </RouterLink>
                            <h3>{{ recipe.title }}</h3>
                            <p v-if="recipe.summary" v-html="shortSummary(recipe.summary)"></p>
                            <button class="add_fav" style="color: aliceblue" @click="handleCreateFav(recipe)">
                                Add To Fav
                            </button>
                        </div>
                        <!-- Sentinel for infinite scrolling -->
                        <div ref="sentinel" style="width: 100%; height: 1px"></div>
                        <!-- Optional fallback button -->
                        <div v-if="!isLoadingMore && hasMore" style="width: 100%; text-align: center; margin-top: 16px">
                            <button @click="loadMore">Load More</button>
                        </div>
                        <div v-if="isLoadingMore" style="width: 100%; text-align: center; margin: 8px; color: #666">
                            Loading more...
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import { ContentLoader } from "vue-content-loader";
import FilterNavbar from "../components/FilterNavbar.vue";
import { useToast } from "vue-toastification";

import { spoonacularApi, localApi, type Recipe, type SearchParams } from "../api";

const searchQuery = ref("");
const recipes = ref<Recipe[]>([]);
const isLoading = ref(false);
const isLoadingMore = ref(false);
const pageSize = ref(12);
const page = ref(0); // zero-based for offset
const hasMore = ref(true);
const sentinel = ref<HTMLElement | null>(null);
const isFilterOpen = ref(false);
const toast = useToast();
const currentFilters = ref<SearchParams>({
    query: "",
    cuisine: [],
    diet: [],
    intolerances: [],
    type: [],
    number: 12,
    addRecipeInformation: true,
});

//filter toggle
const toggleFilter = () => {
    isFilterOpen.value = !isFilterOpen.value;
};

// Search and filter handlers
const handleSearch = async () => {
    if (!searchQuery.value.trim()) return;

    currentFilters.value.query = searchQuery.value;
    await performSearch();
};

const handleFiltersChanged = (filters: SearchParams) => {
    currentFilters.value = { ...filters };
};

const handleApplyFilters = async () => {
    await performSearch();
    isFilterOpen.value = false;
};

const performSearch = async () => {
    // reset list and paging
    recipes.value = [];
    page.value = 0;
    hasMore.value = true;
    isLoading.value = true;
    try {
        if (
            currentFilters.value.query ||
            currentFilters.value.cuisine?.length ||
            currentFilters.value.diet?.length ||
            currentFilters.value.intolerances?.length ||
            currentFilters.value.type?.length
        ) {
            const results = await spoonacularApi.searchRecipes({
                ...currentFilters.value,
                number: pageSize.value,
                offset: 0,
            });
            recipes.value = results;
            hasMore.value = results.length === pageSize.value;
        } else {
            const results = await spoonacularApi.getRandomRecipes({
                number: pageSize.value,
                tags: ["vegetarian", "dessert"],
            });
            recipes.value = results;
            hasMore.value = results.length === pageSize.value;
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipes.value = [];
        hasMore.value = false;
    } finally {
        isLoading.value = false;
    }
};

const loadMore = async () => {
    if (isLoading.value || isLoadingMore.value || !hasMore.value) return;
    isLoadingMore.value = true;
    try {
        if (
            currentFilters.value.query ||
            currentFilters.value.cuisine?.length ||
            currentFilters.value.diet?.length ||
            currentFilters.value.intolerances?.length ||
            currentFilters.value.type?.length
        ) {
            const nextOffset = (page.value + 1) * pageSize.value;
            const results = await spoonacularApi.searchRecipes({
                ...currentFilters.value,
                number: pageSize.value,
                offset: nextOffset,
            });
            recipes.value = recipes.value.concat(results);
            page.value += 1;
            if (results.length < pageSize.value) hasMore.value = false;
        } else {
            // Random API doesn't have offset; we simulate pagination by requesting another batch and appending
            const results = await spoonacularApi.getRandomRecipes({
                number: pageSize.value,
                tags: ["vegetarian", "dessert"],
            });
            recipes.value = recipes.value.concat(results);
            page.value += 1;
            if (results.length < pageSize.value) hasMore.value = false;
        }
    } catch (error) {
        console.error("Error loading more recipes:", error);
        hasMore.value = false;
    } finally {
        isLoadingMore.value = false;
    }
};

// Initialize with random recipes
onMounted(async () => {
    await performSearch();
    // setup intersection observer for infinite scroll
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
                loadMore();
            }
        },
        { rootMargin: "200px" }
    );
    if (sentinel.value) {
        observer.observe(sentinel.value);
    }
});

// Watch for search query changes
watchEffect(() => {
    if (searchQuery.value) {
        handleSearch();
    }
});

const handleCreateFav = async (recipe: Recipe) => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.warning("Please login first");
        return;
    }

    try {
        const data = {
            image: recipe.image,
            title: recipe.title,
            summary: recipe.summary,
            instructions: recipe.instructions,
        };

        const response = await localApi.createRecipe(data);
        toast.success(response.message || "Recipe added to favorites!");
    } catch (error: any) {
        console.error("Error adding recipe to favorites:", error);
        toast.error(error.response?.data?.msg || "Failed to add recipe to favorites");
    }
};

//helper fn for summary
const shortSummary = (summary: string) => {
    // Create a temporary element to strip tags safely for slicing
    const div = document.createElement("div");
    div.innerHTML = summary;
    const text = div.textContent || div.innerText || "";

    // Slice plain text to 134 characters
    const shortText = text.slice(0, 134) + "...";
    return shortText;
};
</script>

<style scoped>
.home-container {
    position: relative;
}

.filter-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.content-area {
    margin-left: 0;
    transition: margin-left 0.3s ease-in-out;
}

@media (min-width: 769px) {
    .content-area {
        margin-left: 0;
    }

    .filter-navbar--open + .content-area {
        margin-left: 350px;
    }
}

.search-scope {
    position: relative;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
}

.fx {
    display: flex;
}

.fx-gap {
    gap: 18px;
}

.search-scope input,
.search-scope button {
    color: #fff;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    outline: none;
}

.search-scope form {
    position: absolute;
    top: 7%;
    left: 0;
    right: 0;
    max-width: 550px;
    height: 70px;
    padding: 15px;

    /* margin: auto; */
    margin: -110px auto 0 auto;
    background-color: #ff7575;
    border-radius: 20px;
    box-shadow: 0 10px 40px #ff7c7c, 0 0 0 20px #ffffffeb;
    transform: scale(0.6);
}

.search-scope input[type="text"] {
    width: 100%;
    height: 96px;
    font-size: 48px;
    line-height: 1;
}

.search-scope input[type="text"]::placeholder {
    color: #e16868;
}

.search-scope button {
    position: relative;
    display: block;
    width: 84px;
    height: 96px;
    cursor: pointer;
}

.search-scope #search-icon-circle {
    position: relative;
    top: -20px;
    left: 0;
    width: 33px;
    height: 33px;
    margin-top: 0;
    border-width: 15px;
    border: 15px solid #fff;
    background-color: transparent;
    border-radius: 50%;
    transition: 0.5s ease all;
}

.search-scope button span {
    position: absolute;
    top: 52px;
    left: 38px;
    display: block;
    width: 45px;
    height: 15px;
    background-color: transparent;
    border-radius: 10px;
    transform: rotateZ(52deg);
    transition: 0.5s ease all;
}

.search-scope button span:before,
.search-scope button span:after {
    content: "";
    position: absolute;
    bottom: 5;
    right: 0;
    width: 45px;
    height: 15px;
    background-color: #fff;
    border-radius: 10px;
    transform: rotateZ(0);
    transition: 0.5s ease all;
}

.search-scope #search-icon:hover #search-icon-circle {
    top: -10px;
    width: 67px;
    height: 15px;
    border-width: 0;
    background-color: #fff;
    border-radius: 20px;
}

.search-scope #search-icon:hover span {
    top: 50%;
    left: 56px;
    width: 25px;
    margin-top: -9px;
    transform: rotateZ(0);
}

.search-scope #search-icon:hover button span:before {
    bottom: 20px;
    transform: rotateZ(52deg);
}

.search-scope #search-icon:hover button span:after {
    bottom: 0px;
    transform: rotateZ(-52deg);
}

.search-scope #search-icon:hover button span:before,
.search-scope #search-icon:hover button span:after {
    right: -6px;
    width: 40px;
    background-color: #fff;
}

.skeleton-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    /* padding: 10px; */
    animation: pulse 1.5s ease-in-out infinite;
}

.subcontainer-heading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-wrap: wrap;
}

#filter-button {
    position: absolute;
    right: 0;
}

.filter-toggle-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #ea9595;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
}

.filter-toggle-btn:hover {
    background-color: #e16868;
}

.filter-toggle-btn.active {
    background-color: #e16868;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .search-scope form {
        position: relative;
        margin-top: 5px;
    }

    .content-area {
        margin-left: 0 !important;
    }
    #filter-button{
        position: relative;
        margin-bottom: 1rem;
    }
}
</style>
