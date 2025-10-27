// Test script for the new get single recipe endpoint
const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

async function testGetSingleRecipe() {
  try {
    console.log('Testing get single recipe endpoint...\n');

    // First, login to get a token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${BASE_URL}/user/login`, {
      email: 'test@example.com',
      pass: 'password123'
    });
    
    const token = loginResponse.data.token;
    if (!token) {
      throw new Error('No token received from login');
    }
    console.log('✅ Login successful');

    // Get user's recipes to find a recipe ID
    console.log('\n2. Getting user recipes...');
    const recipesResponse = await axios.get(`${BASE_URL}/recipe/get`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const recipes = recipesResponse.data;
    if (!recipes || recipes.length === 0) {
      console.log('❌ No recipes found. Please create a recipe first.');
      return;
    }
    
    const recipeId = recipes[0]._id;
    console.log(`✅ Found ${recipes.length} recipes. Testing with recipe ID: ${recipeId}`);

    // Test get single recipe
    console.log('\n3. Testing get single recipe...');
    const singleRecipeResponse = await axios.get(`${BASE_URL}/recipe/get/${recipeId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('✅ Single recipe retrieved successfully:');
    console.log(`   Title: ${singleRecipeResponse.data.title}`);
    console.log(`   ID: ${singleRecipeResponse.data._id}`);
    console.log(`   User ID: ${singleRecipeResponse.data.UserId}`);

    console.log('\n🎉 Get single recipe endpoint test passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testGetSingleRecipe();
}

module.exports = { testGetSingleRecipe };
