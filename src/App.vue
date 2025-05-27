<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0 flex items-center">
            <RouterLink 
              to="/" 
              class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all hover:scale-105"
            >
              Admin<span class="text-gray-700">Hub</span>
            </RouterLink>
          </div>
          
          <!-- Main Navigation -->
          <nav class="hidden md:flex space-x-1">
            <RouterLink
              to="/revenue"
              class="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-indigo-700 transition-colors duration-200 group"
              active-class="text-indigo-700"
            >
              <span>Revenue</span>
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" :class="{ 'w-full': $route.path === '/revenue' }"></span>
            </RouterLink>
            
            <RouterLink
              to="/inventory"
              class="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-indigo-700 transition-colors duration-200 group"
              active-class="text-indigo-700"
            >
              <span>Inventory</span>
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" :class="{ 'w-full': $route.path === '/inventory' }"></span>
            </RouterLink>
            
            <RouterLink
              to="/add-product"
              class="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-indigo-700 transition-colors duration-200 group"
              active-class="text-indigo-700"
            >
              <span>Add Product</span>
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" :class="{ 'w-full': $route.path === '/add-product' }"></span>
            </RouterLink>
          </nav>
          
          <!-- Mobile menu button (hidden on desktop) -->
          <div class="md:hidden flex items-center">
            <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 focus:outline-none">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>