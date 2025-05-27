<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

const props = defineProps(['chartData']);
const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  Chart.register(...registerables);
  renderChart();
});

watch(() => props.chartData, () => {
  if (chartInstance) {
    chartInstance.data = props.chartData;
    chartInstance.update();
  }
});

function renderChart() {
  if (chartInstance) chartInstance.destroy();
  
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: props.chartData,
    options: {
      responsive: true,
      scales: {
        y: { title: { display: true, text: 'Orders' } },
        y1: { 
          position: 'right',
          title: { display: true, text: 'Revenue ($)' }
        }
      }
    }
  });
}
</script>