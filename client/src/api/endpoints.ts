// API Endpoints configuration
export const API_ENDPOINTS = {
  // Spoonacular API endpoints
  SPOONACULAR: {
    BASE_URL: import.meta.env.VITE_SPOON_URL,
    RANDOM_RECIPES: '/recipes/random',
    COMPLEX_SEARCH: '/recipes/complexSearch',
    RECIPE_INFO: '/recipes/{id}/information',
    RECIPE_SUMMARY: '/recipes/{id}/summary'
  },

  // Local backend endpoints
  LOCAL: {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CREATE_RECIPE: '/recipe/create',
    GET_RECIPES: '/recipe/get',
    GET_RECIPE: '/recipe/get',
    DELETE_RECIPE: '/recipe/delete',
    LOGIN: '/user/login',
    REGISTER: '/user/register'
  }
} as const;

// API Keys configuration
export const API_KEYS = {
  SPOONACULAR: {
    PRIMARY: import.meta.env.VITE_SPOON_KEY,
  }
} as const;

// Filter options configuration
export const FILTER_OPTIONS = {
  CUISINES: [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean',
    'Chinese', 'Eastern European', 'European', 'French', 'German',
    'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish',
    'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
    'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
  ],

  DIETS: [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal',
    'Low FODMAP', 'Whole30'
  ],

  INTOLERANCES: [
    'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood',
    'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
  ],

  TYPES: [
    'main course', 'side dish', 'dessert', 'appetizer', 'salad',
    'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade',
    'fingerfood', 'snack', 'drink'
  ]
} as const;
