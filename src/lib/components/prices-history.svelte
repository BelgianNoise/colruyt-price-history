<script lang="ts">
  import type { Price } from "$lib/models/price";
  import { Chart } from 'chart.js';

  export let prices: Price[] = [];
  let canvas: HTMLCanvasElement;

  const createChart = () => {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: sortedPrices.map(price => new Date(price.time).toLocaleDateString()),
        datasets: [{
          data: sortedPrices.map(price => price.basicPrice),
          borderWidth: 1,
          borderColor: '#F5822A',
          backgroundColor: 'rgba(255, 240, 210, 0.95)',
          pointRadius: 0,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0,
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: { size: 18 },
            bodyFont: { size: 18 },
            enabled: true,
            intersect: false,
            mode: 'nearest',
            callbacks: {
              label: function(context) {
                return `€ ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            offsetAfterAutoskip: true,
            max: Math.round(Math.max(...sortedPrices.map(price => price.basicPrice)) * 1.1 + 0.5),
            ticks: {
              callback: function(value) {
                return `€ ${value}`;
              },
              font: { size: 18 },
              maxTicksLimit: 10,
            },
          },
          x: {
            ticks: {
              font: { size: 16 },
              maxTicksLimit: 10,
            },
          },
        }
      }
    });
  };
  $: canvas && sortedPrices ? createChart() : undefined;
  $: sortedPrices = prices.sort((a, b) => a.time > b.time ? 1 : -1);
</script>

<div id="content">
  <canvas id="chart" bind:this={canvas} />
</div>

<style>
  #content {
    position: relative;
    width: 100%;
    height: 400px;
  }
  #chart {
    width: 100% !important;
  }
</style>
