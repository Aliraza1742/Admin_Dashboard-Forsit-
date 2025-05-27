<template>
  <div class="inventory-page p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p class="text-gray-600 mt-1">Manage your product inventory efficiently</p>
        </div>
        
        <!-- Search Bar -->
        <div class="relative w-full sm:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm font-medium text-gray-500">Total Products</p>
          <p class="text-2xl font-semibold mt-1">{{ inventoryData.length }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm font-medium text-gray-500">In Stock</p>
          <p class="text-2xl font-semibold mt-1 text-green-600">{{ inStockCount }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm font-medium text-gray-500">Low Stock</p>
          <p class="text-2xl font-semibold mt-1 text-yellow-600">{{ lowStockItems.length }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm font-medium text-gray-500">Out of Stock</p>
          <p class="text-2xl font-semibold mt-1 text-red-600">{{ outOfStockCount }}</p>
        </div>
      </div>

      <div 
        v-if="lowStockItems.length > 0"
        class="flex items-center p-4 mb-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
      >
        <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
        <div>
          <p class="font-medium text-yellow-800">Inventory Alert</p>
          <p class="text-yellow-700 text-sm">
            {{ lowStockItems.length }} product(s) need attention. 
            <button 
              @click="showLowStock = !showLowStock"
              class="text-indigo-600 hover:underline ml-1 font-medium"
            >
              {{ showLowStock ? 'Show all products' : 'Show only low stock' }}
            </button>
          </p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th 
                  v-for="header in headers"
                  :key="header.key"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  @click="sortBy(header.key)"
                >
                  <div class="flex items-center">
                    {{ header.label }}
                    <ChevronUpDownIcon 
                      v-if="header.sortable"
                      class="h-4 w-4 ml-1 text-gray-400"
                    />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="product in filteredProducts"
                :key="product.id"
                class="hover:bg-gray-50 transition-colors"
                :class="{ 
                  'bg-yellow-50': product.stock < product.minStock && product.stock > 0,
                  'bg-red-50': product.stock === 0
                }"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        :src="product.image || '/placeholder-product.jpg'" 
                        :alt="product.name"
                        class="h-full w-full object-cover"
                      >
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-xs text-gray-500">{{ product.category }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-medium">${{ product.price.toFixed(2) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-24 mr-3">
                      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          class="h-full rounded-full"
                          :class="{
                            'bg-green-500': stockPercentage(product) >= 50,
                            'bg-yellow-500': stockPercentage(product) < 50 && stockPercentage(product) > 20,
                            'bg-red-500': stockPercentage(product) <= 20
                          }"
                          :style="{ width: `${stockPercentage(product)}%` }"
                        ></div>
                      </div>
                    </div>
                    <span class="text-sm font-medium"
                      :class="{
                        'text-green-600': product.stock >= product.minStock,
                        'text-yellow-600': product.stock < product.minStock && product.stock > 0,
                        'text-red-600': product.stock === 0
                      }"
                    >
                      {{ product.stock }} {{ product.stock === 1 ? 'unit' : 'units' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-medium">
                    {{ calculateDaysLeft(product) }} days
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ product.avgDailySales }}/day
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="openEditModal(product)"
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <PencilSquareIcon class="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="filteredProducts.length === 0"
        class="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200 mt-4"
      >
        <FolderOpenIcon class="h-12 w-12 mx-auto text-gray-400" />
        <h3 class="mt-2 text-lg font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    </div>

    <!-- Edit Inventory Modal -->
    <TransitionRoot appear :show="isEditModalOpen" as="template">
      <Dialog as="div" class="relative z-10" @close="closeEditModal">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  <span>Update Inventory</span>
                  <button @click="closeEditModal" class="text-gray-400 hover:text-gray-500">
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </DialogTitle>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-gray-100 mr-4">
                      <img 
                        :src="currentProduct.image || '/placeholder-product.jpg'" 
                        :alt="currentProduct.name"
                        class="h-full w-full object-cover"
                      >
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">{{ currentProduct.name }}</h4>
                      <p class="text-sm text-gray-500">{{ currentProduct.category }}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">Current Stock Level</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="stock"
                        v-model.number="currentProduct.stock"
                        class="block w-full rounded-md border-gray-300 pl-3 pr-12 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        min="0"
                      >
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">units</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-blue-50 p-3 rounded-lg">
                    <div class="flex">
                      <InformationCircleIcon class="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                      <p class="text-sm text-blue-700">
                        Minimum stock level: {{ currentProduct.minStock }} units
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    @click="closeEditModal"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    @click="updateInventory"
                    class="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Inventory
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PencilSquareIcon,
  FolderOpenIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { inventoryData as initialInventoryData } from '../demodata/inventorydata'

// UI State
const searchQuery = ref('')
const sortField = ref('name')
const sortDirection = ref('asc')
const showLowStock = ref(false)
const isEditModalOpen = ref(false)
const currentProduct = ref(null)

// Make inventoryData reactive
const inventoryData = ref([...initialInventoryData])

// Table headers
const headers = ref([
  { key: 'name', label: 'Product', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'stock', label: 'Stock Level', sortable: true },
  { key: 'daysLeft', label: 'Forecast', sortable: true }
])

// Computed properties
const filteredProducts = computed(() => {
  let products = [...inventoryData.value]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    )
  }

  // Show only low stock items if toggled
  if (showLowStock.value) {
    products = products.filter(p => p.stock < p.minStock)
  }

  // Apply sorting
  return products.sort((a, b) => {
    let modifier = sortDirection.value === 'asc' ? 1 : -1
    if (sortField.value === 'daysLeft') {
      return modifier * (calculateDaysLeft(a) - calculateDaysLeft(b))
    }
    return modifier * (a[sortField.value] > b[sortField.value] ? 1 : -1)
  })
})

const lowStockItems = computed(() => 
  inventoryData.value.filter(p => p.stock < p.minStock && p.stock > 0)
)

const outOfStockItems = computed(() => 
  inventoryData.value.filter(p => p.stock === 0)
)

const inStockCount = computed(() => 
  inventoryData.value.filter(p => p.stock >= p.minStock).length
)

const outOfStockCount = computed(() => outOfStockItems.value.length)

// Methods
function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

function calculateDaysLeft(product) {
  if (product.avgDailySales <= 0) return '∞'
  const days = Math.floor(product.stock / product.avgDailySales)
  return days >= 365 ? '1y+' : days >= 30 ? `${Math.floor(days/30)}m` : days
}

function stockPercentage(product) {
  const max = Math.max(product.minStock * 2, 10)
  return Math.min((product.stock / max) * 100, 100)
}

function openEditModal(product) {
  currentProduct.value = JSON.parse(JSON.stringify(product))
  isEditModalOpen.value = true
}

function closeEditModal() {
  isEditModalOpen.value = false
}

function updateInventory() {
  const index = inventoryData.value.findIndex(p => p.id === currentProduct.value.id)
  if (index !== -1) {
    inventoryData.value[index] = { ...currentProduct.value }
  }
  closeEditModal()
}
</script>

<style scoped>
/* Custom styling for transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>