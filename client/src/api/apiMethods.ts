import axios from 'axios';
import type { AxiosResponse } from 'axios'
import { API_ENDPOINTS, API_KEYS } from './endpoints';

// Types for API responses
export interface Recipe {
  id: number;
  image: string;
  title: string;
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  servings?: number;
  cuisines?: string[];
  diets?: string[];
  dishTypes?: string[];
}

export interface SearchParams {
  query?: string;
  cuisine?: string[];
  diet?: string[];
  intolerances?: string[];
  type?: string[];
  number?: number;
  offset?: number;
  addRecipeInformation?: boolean;
}

export interface RandomRecipeParams {
  number?: number;
  tags?: string[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Spoonacular API service
export class SpoonacularApiService {
  private baseURL = API_ENDPOINTS.SPOONACULAR.BASE_URL;
  private apiKey = API_KEYS.SPOONACULAR.PRIMARY;

  private buildUrl(endpoint: string, params: Record<string, any> = {}): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('apiKey', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          url.searchParams.append(key, value.join(','));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });
    
    return url.toString();
  }

  async getRandomRecipes(params: RandomRecipeParams = {}): Promise<Recipe[]> {
    try {
      const url = this.buildUrl(API_ENDPOINTS.SPOONACULAR.RANDOM_RECIPES, {
        number: params.number || 12
      });
      
      const response: AxiosResponse<{ recipes: Recipe[] }> = await axios.get(url);
      return response.data.recipes || [];
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      throw error;
    }
  }

  async searchRecipes(params: SearchParams): Promise<Recipe[]> {
    try {
      const url = this.buildUrl(API_ENDPOINTS.SPOONACULAR.COMPLEX_SEARCH, {
        query: params.query || '',
        cuisine: params.cuisine,
        diet: params.diet,
        intolerances: params.intolerances,
        type: params.type,
        number: params.number || 12,
        offset: params.offset || 0,
        addRecipeInformation: params.addRecipeInformation || true
      });
      
      const response: AxiosResponse<{ results: Recipe[] }> = await axios.get(url);
      return response.data.results || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }

  async getRecipeInfo(id: number): Promise<Recipe> {
    try {
      const endpoint = API_ENDPOINTS.SPOONACULAR.RECIPE_INFO.replace('{id}', id.toString());
      const url = this.buildUrl(endpoint);
      
      const response: AxiosResponse<Recipe> = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe info:', error);
      throw error;
    }
  }

  async getRecipeSummary(id: number): Promise<string> {
    try {
      const endpoint = API_ENDPOINTS.SPOONACULAR.RECIPE_SUMMARY.replace('{id}', id.toString());
      const url = this.buildUrl(endpoint);
      
      const response: AxiosResponse<{ summary: string }> = await axios.get(url);
      return response.data.summary;
    } catch (error) {
      console.error('Error fetching recipe summary:', error);
      throw error;
    }
  }
}

// Local backend API service
export class LocalApiService {
  private baseURL = API_ENDPOINTS.LOCAL.BASE_URL;

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async refreshTokenIfNeeded(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    }
    return false;
  }

  async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<ApiResponse<any>> {
    try {
      const response = await axios.post(
        `${this.baseURL}${API_ENDPOINTS.LOCAL.CREATE_RECIPE}`,
        recipe,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshed = await this.refreshTokenIfNeeded();
        if (refreshed) {
          // Retry the request with new token
          const response = await axios.post(
            `${this.baseURL}${API_ENDPOINTS.LOCAL.CREATE_RECIPE}`,
            recipe,
            { headers: this.getAuthHeaders() }
          );
          return response.data;
        }
      }
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  async getRecipes(): Promise<ApiResponse<Recipe[]>> {
    try {
      const response = await axios.get(
        `${this.baseURL}${API_ENDPOINTS.LOCAL.GET_RECIPES}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshed = await this.refreshTokenIfNeeded();
        if (refreshed) {
          const response = await axios.get(
            `${this.baseURL}${API_ENDPOINTS.LOCAL.GET_RECIPES}`,
            { headers: this.getAuthHeaders() }
          );
          return response.data;
        }
      }
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  async getRecipe(id: string): Promise<ApiResponse<Recipe>> {
    try {
      const response = await axios.get(
        `${this.baseURL}${API_ENDPOINTS.LOCAL.GET_RECIPE}/${id}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshed = await this.refreshTokenIfNeeded();
        if (refreshed) {
          const response = await axios.get(
            `${this.baseURL}${API_ENDPOINTS.LOCAL.GET_RECIPE}/${id}`,
            { headers: this.getAuthHeaders() }
          );
          return response.data;
        }
      }
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }

  async deleteRecipe(id: string | number): Promise<ApiResponse<any>> {
    try {      
      const response = await axios.delete(
        `${this.baseURL}${API_ENDPOINTS.LOCAL.DELETE_RECIPE}/${id}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshed = await this.refreshTokenIfNeeded();
        if (refreshed) {
          const response = await axios.delete(
            `${this.baseURL}${API_ENDPOINTS.LOCAL.DELETE_RECIPE}/${id}`,
            { headers: this.getAuthHeaders() }
          );
          return response.data;
        }
      }
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }

  async login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    try {
      const response = await axios.post(
        `${this.baseURL}${API_ENDPOINTS.LOCAL.LOGIN}`,
        credentials,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // Store both tokens if login is successful
      if (response.data.token && response.data.refreshToken) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userData', JSON.stringify({
          UserId: response.data.UserId,
          user: response.data.user
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async register(userData: { user: string; email: string; password: string }): Promise<ApiResponse<any>> {
    try {
      const response = await axios.post(
        `${this.baseURL}${API_ENDPOINTS.LOCAL.REGISTER}`,
        userData,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  }
}

// Export singleton instances
export const spoonacularApi = new SpoonacularApiService();
export const localApi = new LocalApiService();
