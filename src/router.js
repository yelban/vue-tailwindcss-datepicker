import { createRouter, createWebHistory } from 'vue-router'
import DatePicker from './components/DatePicker.vue'

const routes = [
  {
    path: '/',
    name: 'DatePicker',
    component: DatePicker
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
