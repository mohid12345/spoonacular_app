// Simple API test script
const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

async function testAPI() {
  try {
    console.log('Testing Recipe App API...\n');

    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: User registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      pass: 'password123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/user/register`, registerData);
      console.log('✅ Registration response:', registerResponse.data);
    } catch (error) {
      if (error.response?.data?.msg === 'You are already register') {
        console.log('✅ User already exists (expected)');
      } else {
        throw error;
      }
    }

    // Test 3: User login
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      pass: 'password123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/user/login`, loginData);
    console.log('✅ Login response:', loginResponse.data);
    
    const token = loginResponse.data.token;
    const userId = loginResponse.data.UserId;

    if (!token) {
      throw new Error('No token received from login');
    }

    // Test 4: Create recipe (requires auth)
    console.log('\n4. Testing recipe creation...');
    const recipeData = {
      image: 'https://example.com/image.jpg',
      title: 'Test Recipe',
      summary: 'A test recipe for API testing',
      instructions: '1. Mix ingredients\n2. Cook for 30 minutes\n3. Serve hot',
      user: 'Test User',
      UserId: userId
    };
    
    const createRecipeResponse = await axios.post(`${BASE_URL}/recipe/create`, recipeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Recipe creation response:', createRecipeResponse.data);

    // Test 5: Get user recipes
    console.log('\n5. Testing get user recipes...');
    const getRecipesResponse = await axios.get(`${BASE_URL}/recipe/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Get recipes response:', getRecipesResponse.data);

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
