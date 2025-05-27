<template>
  <div class="revenue-page p-4 sm:p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Revenue Analysis Dashboard</h1>
      <p class="text-gray-600">Track and analyze your sales performance</p>
    </div>
    
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
            <p class="text-2xl font-semibold text-gray-800">{{ totalOrders.toLocaleString() }}</p>
          </div>
          <div class="p-3 rounded-lg bg-indigo-50 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 text-sm text-green-600 font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
          </svg>
          12.5% from last period
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
            <p class="text-2xl font-semibold text-gray-800">${{ totalRevenue.toLocaleString() }}</p>
          </div>
          <div class="p-3 rounded-lg bg-green-50 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 text-sm text-green-600 font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
          </svg>
          8.3% from last period
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">Avg. Order Value</h3>
            <p class="text-2xl font-semibold text-gray-800">${{ averageOrderValue.toFixed(2) }}</p>
          </div>
          <div class="p-3 rounded-lg bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 text-sm text-red-600 font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
          </svg>
          3.2% from last period
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
          <select 
            v-model="timeFilter" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            v-model="categoryFilter" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            <option v-for="cat in categories" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <div class="relative">
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Select date range">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-end">
          <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Revenue Trend Chart -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Revenue Trend</h2>
          <button class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
            View Report
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <RevenueTrendChart 
          v-if="filteredData.length > 0"
          :chart-data="revenueChartData" 
        />
        <div v-else class="h-64 flex items-center justify-center text-gray-500">
          No revenue data available for current filters
        </div>
      </div>

      <!-- Orders vs Sales Chart -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Orders vs Revenue</h2>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">Orders</button>
            <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Revenue</button>
          </div>
        </div>
        <OrdersComparisonChart 
          v-if="filteredData.length > 0"
          :chart-data="comparisonChartData" 
        />
        <div v-else class="h-64 flex items-center justify-center text-gray-500">
          No comparison data available
        </div>
      </div>
    </div>

    <!-- Category Revenue Breakdown -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Category Breakdown</h2>
        <select class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500">
          <option>By Revenue</option>
          <option>By Orders</option>
          <option>By Profit</option>
        </select>
      </div>
      <CategoryRevenueChart 
        v-if="filteredData.length > 0"
        :chart-data="categoryChartData" 
      />
      <div v-else class="h-64 flex items-center justify-center text-gray-500">
        No category data available
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { revenueData, categories } from '../demodata/salesdata';
import RevenueTrendChart from '../components/charts/RevenueTrendChart.vue';
import OrdersComparisonChart from '../components/charts/OrdersComparisonChart.vue';
import CategoryRevenueChart from '../components/charts/CategoryRevenueChart.vue';

// Filters
const timeFilter = ref('daily');
const categoryFilter = ref('all');

// Get only relevant data based on time filter
const baseData = computed(() => {
  if (timeFilter.value === 'daily') {
    return revenueData.filter(item => item.date.includes('-') && item.date.split('-').length === 3);
  } else if (timeFilter.value === 'weekly') {
    return revenueData.filter(item => item.date.startsWith('2024-W'));
  } else {
    return revenueData.filter(item => item.date.split('-').length === 2);
  }
});

// Computed filtered data
const filteredData = computed(() => {
  let data = [...baseData.value];

  if (categoryFilter.value !== 'all') {
    data = data.filter(item => item.category === categoryFilter.value);
  }

  return data;
});

// Summary metrics
const totalOrders = computed(() => 
  filteredData.value.reduce((sum, item) => sum + item.orders, 0)
);

const totalRevenue = computed(() => 
  filteredData.value.reduce((sum, item) => sum + item.revenue, 0)
);

const averageOrderValue = computed(() => 
  totalOrders.value ? (totalRevenue.value / totalOrders.value) : 0
);

// Chart data preparation
const revenueChartData = computed(() => {
  if (filteredData.value.length === 0) return { labels: [], datasets: [] };

  const sortedData = [...filteredData.value].sort((a, b) => 
    new Date(a.date) - new Date(b.date));
  
  return {
    labels: sortedData.map(item => {
      if (timeFilter.value === 'daily') return item.date.split('-')[2] + ' May';
      if (timeFilter.value === 'weekly') return `Week ${item.date.split('W')[1]}`;
      return new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    }),
    datasets: [{
      label: 'Revenue ($)',
      data: sortedData.map(item => item.revenue),
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.3,
      fill: true
    }]
  };
});

const comparisonChartData = computed(() => {
  if (filteredData.value.length === 0) return { labels: [], datasets: [] };

  const sortedData = [...filteredData.value].sort((a, b) => 
    new Date(a.date) - new Date(b.date));
  
  // Normalize orders to better fit with revenue
  const maxOrders = Math.max(...sortedData.map(item => item.orders));
  const maxRevenue = Math.max(...sortedData.map(item => item.revenue));
  const scaleFactor = maxRevenue / maxOrders;

  return {
    labels: sortedData.map(item => {
      if (timeFilter.value === 'daily') return item.date.split('-')[2];
      if (timeFilter.value === 'weekly') return `W${item.date.split('W')[1]}`;
      return item.date.split('-')[0];
    }),
    datasets: [
      {
        label: 'Orders',
        data: sortedData.map(item => item.orders),
        backgroundColor: '#10b981',
        barPercentage: 0.6,
        categoryPercentage: 0.8
      },
      {
        label: 'Revenue (scaled)',
        data: sortedData.map(item => item.revenue / scaleFactor),
        backgroundColor: '#3b82f6',
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        yAxisID: 'y'
      }
    ]
  };
});

const categoryChartData = computed(() => {
  if (filteredData.value.length === 0) return { labels: [], datasets: [] };

  const categoryMap = {};
  
  filteredData.value.forEach(item => {
    const cat = item.category || 'All';
    if (!categoryMap[cat]) categoryMap[cat] = { revenue: 0, orders: 0 };
    categoryMap[cat].revenue += item.revenue;
    categoryMap[cat].orders += item.orders;
  });
  
  return {
    labels: Object.keys(categoryMap),
    datasets: [{
      label: 'Revenue ($)',
      data: Object.values(categoryMap).map(c => c.revenue),
      backgroundColor: [
        '#4f46e5', '#10b981', '#f59e0b', 
        '#ef4444', '#8b5cf6', '#ec4899'
      ],
      borderWidth: 1
    }]
  };
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 80%;
  min-height: 300px;
}
</style>