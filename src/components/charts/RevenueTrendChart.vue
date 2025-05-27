<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

const props = defineProps(['chartData']);
const chartCanvas = ref(null);
let chartInstance = null;

// Initialize Chart.js
Chart.register(...registerables);

// Create or update chart
const renderChart = () => {
  if (!chartCanvas.value) return;
  
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: props.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `$${context.raw.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`
          }
        }
      }
    }
  });
};

// Initialize chart on mount
onMounted(() => {
  renderChart();
});

// Clean up before unmount
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

// Watch for data changes
watch(
  () => props.chartData,
  (newData) => {
    if (!chartInstance || !chartCanvas.value) return;
    
    // Check if the canvas is still in the DOM
    if (!document.body.contains(chartCanvas.value)) {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      return;
    }

    // Update chart data
    chartInstance.data = newData;
    chartInstance.update();
  },
  { deep: true }
);
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 40%;
  min-height: 300px;
}
</style>