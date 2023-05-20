import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Categories from '../views/Categories.vue'
import Category from '../views/Category.vue'
import Questions from '../views/Questions.vue'
import RealTime from '../views/RealTime.vue'
import SignIn from '../views/SignIn.vue'
import About from '../views/About.vue'
import Games from '../views/Games.vue'
import { projectAuth } from '@/firebase/config'

// Auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if(!user)
  {
    next({ name: 'SignIn'})
  }
  else
  {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: requireAuth
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true,
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
