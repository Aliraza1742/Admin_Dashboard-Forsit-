<template>
  <div class="product-registration bg-gray-50 min-h-screen p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
¡      <div class="mb-6 flex items-start gap-4">
        <button
          @click="router.push('/inventory')"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add New Product</h1>
          <p class="text-gray-600 mt-1">Fill in the details to expand your inventory</p>
        </div>
      </div>

      <!-- Form Card with Progress Steps -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Progress Steps -->
        <div class="border-b border-gray-200 px-6 py-4">
          <nav class="flex items-center justify-center">
            <ol class="flex items-center space-x-4">
              <li v-for="(step, index) in steps" :key="step.name" class="flex items-center">
                <span
                  :class="{
                    'bg-indigo-600 text-white': currentStep >= index + 1,
                    'bg-gray-100 text-gray-500': currentStep < index + 1,
                    'ring-2 ring-indigo-500 ring-offset-2': currentStep === index + 1
                  }"
                  class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors"
                >
                  {{ index + 1 }}
                </span>
                <span
                  v-if="index < steps.length - 1"
                  :class="{
                    'bg-indigo-200': currentStep > index + 1,
                    'bg-gray-200': currentStep <= index + 1
                  }"
                  class="mx-2 block h-0.5 w-8 transition-colors"
                ></span>
              </li>
            </ol>
          </nav>
          <p class="mt-2 text-center text-sm font-medium text-indigo-600">
            {{ steps[currentStep - 1].name }}
          </p>
        </div>

        <form @submit.prevent="submitForm" class="p-6 sm:p-8">
          <!-- Step 1: Basic Information -->
          <div v-show="currentStep === 1" class="space-y-6">
            <!-- Product Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div class="flex flex-col sm:flex-row items-center gap-6">
                <div class="relative group">
                  <div
                    class="h-40 w-40 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden transition-all duration-200 group-hover:border-indigo-300"
                    :class="{ 'border-indigo-400': previewImage }"
                  >
                    <img 
                      :src="previewImage || '/placeholder-upload.jpg'" 
                      class="h-full w-full object-cover"
                    >
                  </div>
                  <button
                    type="button"
                    @click="openFilePicker"
                    class="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                  >
                    <CameraIcon class="h-5 w-5 text-indigo-600" />
                  </button>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleImageUpload"
                  >
                </div>
                <div class="flex-1">
                  <button
                    type="button"
                    @click="openFilePicker"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <ArrowUpTrayIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                    Upload Image
                  </button>
                  <p class="mt-2 text-xs text-gray-500">
                    Recommended: Square ratio, JPG/PNG (Max 2MB)
                  </p>
                  <div v-if="previewImage" class="mt-2">
                    <button
                      type="button"
                      @click="removeImage"
                      class="text-xs text-red-600 hover:text-red-800 font-medium flex items-center"
                    >
                      <TrashIcon class="h-4 w-4 mr-1" />
                      Remove image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Name -->
            <div>
              <label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <div class="mt-1 relative">
                <input
                  type="text"
                  id="product-name"
                  v-model="product.name"
                  required
                  placeholder="e.g. Wireless Headphones"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span v-if="product.name.length > 0" class="text-xs text-gray-500">
                    {{ product.name.length }}/60
                  </span>
                </div>
              </div>
            </div>

            <!-- Category -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <div class="mt-1">
                  <select
                    id="category"
                    v-model="product.category"
                    required
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                  >
                    <option value="" disabled selected>Select a category</option>
                    <option v-for="category in categories" :value="category">{{ category }}</option>
                  </select>
                </div>
              </div>

              <!-- Price -->
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <div class="mt-1 relative rounded-lg shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    v-model.number="product.price"
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00"
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-7 pr-12 py-3 border"
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Inventory Details -->
          <div v-show="currentStep === 2" class="space-y-6">
            <!-- Stock Information -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Initial Stock -->
              <div>
                <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">Initial Stock *</label>
                <div class="mt-1 relative">
                  <input
                    type="number"
                    id="stock"
                    v-model.number="product.stock"
                    min="0"
                    required
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">units</span>
                  </div>
                </div>
              </div>

              <!-- Minimum Stock -->
              <div>
                <label for="min-stock" class="block text-sm font-medium text-gray-700 mb-1">Minimum Stock *</label>
                <div class="mt-1 relative">
                  <input
                    type="number"
                    id="min-stock"
                    v-model.number="product.minStock"
                    min="1"
                    required
                    class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">units</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stock Visual Indicator -->
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Stock Level</span>
                <span class="text-xs font-medium" :class="stockLevelClass">
                  {{ stockLevelText }}
                </span>
              </div>
              <div class="relative pt-1">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-xs font-semibold inline-block text-indigo-600">
                      {{ product.stock || 0 }} units
                    </span>
                  </div>
                  <div>
                    <span class="text-xs font-semibold inline-block text-gray-500">
                      Min: {{ product.minStock || 0 }} units
                    </span>
                  </div>
                </div>
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 mt-2">
                  <div
                    :style="`width: ${stockPercentage}%`"
                    :class="stockLevelBarClass"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Average Daily Sales -->
            <div>
              <label for="avg-sales" class="block text-sm font-medium text-gray-700 mb-1">Average Daily Sales</label>
              <div class="mt-1 relative">
                <input
                  type="number"
                  id="avg-sales"
                  v-model.number="product.avgDailySales"
                  min="0"
                  step="1"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">units/day</span>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Used for inventory forecasting (default: 1 unit/day)
              </p>
            </div>
          </div>

          <!-- Step 3: Additional Details -->
          <div v-show="currentStep === 3" class="space-y-6">
            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div class="mt-1">
                <textarea
                  id="description"
                  v-model="product.description"
                  rows="4"
                  placeholder="Describe the product features, specifications, and benefits..."
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                ></textarea>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                {{ product.description.length }}/500 characters
              </p>
            </div>

            <!-- SKU/Barcode (Optional) -->
            <div>
              <label for="sku" class="block text-sm font-medium text-gray-700 mb-1">SKU/Barcode (Optional)</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="sku"
                  v-model="product.sku"
                  placeholder="e.g. PROD-12345"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                >
              </div>
            </div>

            <!-- Supplier Information (Optional) -->
            <div>
              <label for="supplier" class="block text-sm font-medium text-gray-700 mb-1">Supplier (Optional)</label>
              <div class="mt-1">
                <input
                  type="text"
                  id="supplier"
                  v-model="product.supplier"
                  placeholder="e.g. Acme Corp"
                  class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border"
                >
              </div>
            </div>
          </div>

          <!-- Form Navigation -->
          <div class="mt-8 flex justify-between">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Back
            </button>
            <div v-else></div> <!-- Empty div for spacing -->

            <button
              v-if="currentStep < steps.length"
              type="button"
              @click="nextStep"
              class="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Continue
            </button>
            <button
              v-else
              type="submit"
              class="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Notification -->
    <TransitionRoot appear :show="showSuccess" as="template">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 translate-y-4"
        enter-to="opacity-100 translate-y-0"
        leave="duration-200 ease-in"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 translate-y-4"
      >
        <div v-if="showSuccess" class="fixed bottom-4 right-4 z-50">
          <div class="rounded-lg bg-green-50 p-4 shadow-lg border border-green-200 max-w-sm">
            <div class="flex">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-5 w-5 text-green-500" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">Product added successfully!</h3>
                <div class="mt-1 text-sm text-green-700">
                  <p>{{ product.name }} has been added to your inventory.</p>
                </div>
                <div class="mt-2">
                  <button
                    @click="showSuccess = false; router.push('/inventory')"
                    class="text-sm font-medium text-green-700 hover:text-green-600 focus:outline-none"
                  >
                    View in inventory →
                  </button>
                </div>
              </div>
              <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    @click="showSuccess = false"
                    class="inline-flex rounded-lg bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    <span class="sr-only">Dismiss</span>
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInventoryStore } from '../store/inventory'
import { categories } from '../demodata/salesdata' 
import { 
  CameraIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import {
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
const router = useRouter()
const inventoryStore = useInventoryStore()

const steps = [
  { name: 'Basic Information' },
  { name: 'Inventory Details' },
  { name: 'Additional Details' }
]
const currentStep = ref(1)

const nextStep = () => {
  // Basic validation i am doing here
  if (currentStep.value === 1 && (!product.value.name || !product.value.category || !product.value.price)) {
    return
  }
  if (currentStep.value === 2 && (product.value.stock === null || product.value.minStock === null)) {
    return
  }
  currentStep.value++
}

// form credentials
const product = ref({
  name: '',
  category: '',
  price: null,
  stock: null,
  minStock: 5,
  description: '',
  image: null,
  avgDailySales: 1,
  sku: '',
  supplier: ''
})


// Image upload
const fileInput = ref(null)
const previewImage = ref(null)

const openFilePicker = () => {
  fileInput.value.click()
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB')
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Only JPG, PNG, or WEBP images are allowed')
      return
    }
    product.value.image = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  product.value.image = null
  previewImage.value = null
  fileInput.value.value = ''
}

// Stock level indicators
const stockPercentage = computed(() => {
  if (!product.value.stock || !product.value.minStock) return 0
  const max = Math.max(product.value.minStock * 3, 10)
  return Math.min((product.value.stock / max) * 100, 100)
})

const stockLevelText = computed(() => {
  if (!product.value.stock) return 'No stock'
  if (product.value.stock >= product.value.minStock * 1.5) return 'High stock'
  if (product.value.stock >= product.value.minStock) return 'Adequate'
  if (product.value.stock > 0) return 'Low stock'
  return 'Out of stock'
})

const stockLevelClass = computed(() => {
  if (!product.value.stock) return 'text-gray-500'
  if (product.value.stock >= product.value.minStock * 1.5) return 'text-green-600'
  if (product.value.stock >= product.value.minStock) return 'text-blue-600'
  if (product.value.stock > 0) return 'text-yellow-600'
  return 'text-red-600'
})

const stockLevelBarClass = computed(() => {
  if (!product.value.stock) return 'bg-gray-400'
  if (product.value.stock >= product.value.minStock * 1.5) return 'bg-green-500'
  if (product.value.stock >= product.value.minStock) return 'bg-blue-500'
  if (product.value.stock > 0) return 'bg-yellow-500'
  return 'bg-red-500'
})

// Form submission
const showSuccess = ref(false)

const submitForm = () => {
  // Generate a unique ID (in a real app, this would come from your backend)
  const newProduct = {
    ...product.value,
    id: Math.max(...inventoryStore.products.map(p => p.id), 0) + 1,
    // Convert price to number if it's a string
    price: Number(product.value.price),
    // Set default values if null
    stock: product.value.stock || 0,
    minStock: product.value.minStock || 5,
    avgDailySales: product.value.avgDailySales || 1
  }

  // Add to inventory (Pinia store)
  inventoryStore.addProduct(newProduct)
  
  // Show success message
  showSuccess.value = true
  
  // Reset form after delay
  setTimeout(() => {
    if (!showSuccess.value) return // User might have dismissed it
    
    // Reset form
    product.value = {
      name: '',
      category: '',
      price: null,
      stock: null,
      minStock: 5,
      description: '',
      image: null,
      avgDailySales: 1,
      sku: '',
      supplier: ''
    }
    previewImage.value = null
    currentStep.value = 1
    
    // Redirect after another delay
    setTimeout(() => {
      router.push('/inventory')
    }, 500)
  }, 3000)
}
</script>

<style scoped>
/* Custom styling for the file input */
input[type="file"] {
  visibility: hidden;
  position: absolute;
}

/* Smooth transitions for all interactive elements */
button, input, select, textarea {
  transition: all 0.2s ease;
}

/* Custom focus styles */
input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

/* Custom scrollbar for textarea */
textarea {
  scrollbar-width: thin;
  scrollbar-color: #c7d2fe #f5f3ff;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f5f3ff;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #c7d2fe;
  border-radius: 4px;
}
</style>