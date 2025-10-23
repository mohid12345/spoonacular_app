<template>
  <div class="filter-navbar" :class="{ 'filter-navbar--open': isOpen }">
    <div class="filter-navbar__header">
      <h3>Filter Recipes</h3>
      <button @click="toggleFilter" class="filter-toggle">
        {{ isOpen ? '✕' : '☰' }}
      </button>
    </div>
    
    <div class="filter-navbar__content" v-if="isOpen">
      <!-- Search Query -->
      <div class="filter-section">
        <label class="filter-label">Search Query</label>
        <input 
          v-model="filters.query" 
          type="text" 
          placeholder="Search recipes..." 
          class="filter-input"
          @input="emitFilters"
        />
      </div>

      <!-- Cuisine Filter -->
      <div class="filter-section">
        <label class="filter-label">Cuisine</label>
        <div class="filter-checkboxes">
          <label v-for="cuisine in FILTER_OPTIONS.CUISINES" :key="cuisine" class="filter-checkbox">
            <input 
              type="checkbox" 
              :value="cuisine" 
              v-model="filters.cuisine"
              @change="emitFilters"
            />
            <span>{{ cuisine }}</span>
          </label>
        </div>
      </div>

      <!-- Diet Filter -->
      <div class="filter-section">
        <label class="filter-label">Diet</label>
        <div class="filter-checkboxes">
          <label v-for="diet in FILTER_OPTIONS.DIETS" :key="diet" class="filter-checkbox">
            <input 
              type="checkbox" 
              :value="diet" 
              v-model="filters.diet"
              @change="emitFilters"
            />
            <span>{{ diet }}</span>
          </label>
        </div>
      </div>

      <!-- Intolerances Filter -->
      <div class="filter-section">
        <label class="filter-label">Intolerances</label>
        <div class="filter-checkboxes">
          <label v-for="intolerance in FILTER_OPTIONS.INTOLERANCES" :key="intolerance" class="filter-checkbox">
            <input 
              type="checkbox" 
              :value="intolerance" 
              v-model="filters.intolerances"
              @change="emitFilters"
            />
            <span>{{ intolerance }}</span>
          </label>
        </div>
      </div>

      <!-- Type Filter -->
      <div class="filter-section">
        <label class="filter-label">Dish Type</label>
        <div class="filter-checkboxes">
          <label v-for="type in FILTER_OPTIONS.TYPES" :key="type" class="filter-checkbox">
            <input 
              type="checkbox" 
              :value="type" 
              v-model="filters.type"
              @change="emitFilters"
            />
            <span>{{ type }}</span>
          </label>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <div class="filter-actions">
        <button @click="clearFilters" class="clear-filters-btn">
          Clear All Filters
        </button>
        <button @click="applyFilters" class="apply-filters-btn">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { FILTER_OPTIONS, type SearchParams } from '../api';

// Props
interface Props {
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
});

// Emits
const emit = defineEmits<{
  'update:isOpen': [value: boolean];
  'filters-changed': [filters: SearchParams];
  'apply-filters': [filters: SearchParams];
}>();

// Reactive data
const isOpen = ref(props.isOpen);
const filters = reactive<SearchParams>({
  query: '',
  cuisine: [],
  diet: [],
  intolerances: [],
  type: [],
  number: 12,
  addRecipeInformation: true
});

// Methods
const toggleFilter = () => {
  console.log("hello");
  
  isOpen.value = !isOpen.value;
  console.log("side nav :",isOpen);
  
  emit('update:isOpen', isOpen.value);
};

const emitFilters = () => {
  emit('filters-changed', { ...filters });
};

const applyFilters = () => {
  emit('apply-filters', { ...filters });
};

const clearFilters = () => {
  filters.query = '';
  filters.cuisine = [];
  filters.diet = [];
  filters.intolerances = [];
  filters.type = [];
  emitFilters();
};

// Watch for prop changes
watch(() => props.isOpen, (newValue) => {
  isOpen.value = newValue;
});
</script>

<style scoped>
.filter-navbar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 350px;
  background-color: #fff;
  border-right: 2px solid #ffd8d8;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
}

.filter-navbar--open {
  transform: translateX(0);
}

.filter-navbar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffd8d8;
  border-bottom: 1px solid #e16868;
}

.filter-navbar__header h3 {
  margin: 0;
  color: #e16868;
  font-size: 1.2rem;
  font-weight: bold;
}

.filter-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #e16868;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.filter-toggle:hover {
  background-color: rgba(225, 104, 104, 0.1);
}

.filter-navbar__content {
  padding: 20px;
}

.filter-section {
  margin-bottom: 25px;
}

.filter-label {
  display: block;
  font-weight: bold;
  color: #e16868;
  margin-bottom: 10px;
  font-size: 1rem;
}

.filter-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ffd8d8;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.filter-input:focus {
  outline: none;
  border-color: #e16868;
}

.filter-checkboxes {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 5px;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.filter-checkbox:hover {
  background-color: #f8f9fa;
}

.filter-checkbox input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.1);
  accent-color: #e16868;
}

.filter-checkbox span {
  font-size: 0.9rem;
  color: #333;
}

.filter-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.clear-filters-btn,
.apply-filters-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-filters-btn {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 2px solid #dee2e6;
}

.clear-filters-btn:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

.apply-filters-btn {
  background-color: #e16868;
  color: white;
}

.apply-filters-btn:hover {
  background-color: #d55a5a;
}

/* Responsive design */
@media (max-width: 768px) {
  .filter-navbar {
    width: 100%;
    transform: translateX(-100%);
  }
  
  .filter-checkboxes {
    grid-template-columns: 1fr 1fr;
  }
  
  .filter-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .filter-checkboxes {
    grid-template-columns: 1fr;
  }
}
</style>
