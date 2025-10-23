// API Endpoints configuration
export const API_ENDPOINTS = {
  // Spoonacular API endpoints
  SPOONACULAR: {
    BASE_URL: 'https://api.spoonacular.com',
    RANDOM_RECIPES: '/recipes/random',
    COMPLEX_SEARCH: '/recipes/complexSearch',
    RECIPE_INFO: '/recipes/{id}/information',
    RECIPE_SUMMARY: '/recipes/{id}/summary'
  },
  
  // Local backend endpoints
  LOCAL: {
    BASE_URL: 'http://127.0.0.1:3001',
    CREATE_RECIPE: '/recipe/create',
    GET_RECIPES: '/recipe/get',
    DELETE_RECIPE: '/recipe/delete',
    LOGIN: '/user/login',
    REGISTER: '/user/register'
  }
} as const;

// API Keys configuration
export const API_KEYS = {
  SPOONACULAR: {
    // PRIMARY: 'dbe52d63dee3460eabb650a612e7f9ad',
    PRIMARY: 'be80f53c2c2f42529d5259df3fb2cbc1',
    // SECONDARY: '669aaaeebc2c443dad9cb08436de8d23',
    // TERTIARY: '4af02576760d4266b2534701bd32f8f9'
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
