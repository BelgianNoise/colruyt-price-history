<script>
  import "./styles.css"
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
  // Setup chart.js to use globally
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  // Setup Vercel Analytics
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  inject({ mode: dev ? 'development' : 'production' });
</script>

<div id="container">
  <Header />
  <div id="slot-container">
    <slot />
  </div>
  <Footer />
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  #slot-container {
    flex: 1;
    width: calc(100vw - 2 * var(--m-small));
    max-width: 1000px !important;
    margin: auto;
    padding: var(--m-small);
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 650px) {
    #slot-container {
      padding: var(--m-normal) var(--m-large);
      width: calc(100vw - 2 * var(--m-large));
    }
  }
</style>
