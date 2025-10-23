import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import FavRecipe from '../views/FavRecipe.vue'
import Details from '../views/Details.vue'
import FavoriteDetails from '../views/FavoriteDetails.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Navbar from '../components/Navbar.vue'

const routes = [
  {
    path: '/',
    components: {
      default: Home,
      navbar: Navbar,
    },
    props: {
      navbar: { isFilterOpen: false }
    }
  },
  {
    path: '/login',
    components: {
      default: Login,
      navbar: Navbar,
    },
    props: {
      navbar: { isFilterOpen: false }
    }
  },
  {
    path: '/register',
    components: {
      default: Register,
      navbar: Navbar,
    },
    props: {
      navbar: { isFilterOpen: false }
    }
  },
  {
    path: '/fav_recipe',
    components: {
      default: FavRecipe,
      navbar: Navbar,
    },
    props: {
      navbar: { isFilterOpen: false }
    }
  },
  {
    path: '/favorite/:id',
    components: {
      default: FavoriteDetails,
      navbar: Navbar,
    },
    props: {
      navbar: { isFilterOpen: false }
    }
  },
  {
    path: '/:id',
    components: {
      default: Details,
      navbar: Navbar,
    },
    props: {
      navbar: { isFilterOpen: false }
    }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})