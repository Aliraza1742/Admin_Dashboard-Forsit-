import { createRouter, createWebHistory } from 'vue-router'
import RevenueAnalysis from '../pages/RevenueAnalysis.vue'
import InventoryManagementPage from '../pages/InventoryManagement.vue'
import ProductRegistration from '../pages/ProductRegistration.vue'

const routes = [
  {
    path: '/',
    redirect: '/revenue'
  },
  {
    path: '/revenue',
    name: 'Revenue',
    component: RevenueAnalysis
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryManagementPage
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: ProductRegistration
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router