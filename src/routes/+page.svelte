<script lang="ts">
  import type { RootLoadResults } from "./+page.server";
  import PriceChangeCard from "$lib/components/price-change-card.svelte";
  export let data: RootLoadResults;
  let screenSize: number;

  $: priceChanges = data.priceChanges.sort((a, b) => b.priceChangePercentage - a.priceChangePercentage);
  $: showAmount = screenSize > 900 ? 8 : 6;
  $: increases = priceChanges.slice(0, showAmount);
  $: decreases = priceChanges.slice(priceChanges.length - showAmount, priceChanges.length).reverse();

</script>

<svelte:window bind:innerWidth={screenSize} />

<div id="content">

  <div class="tooltip-container">
    <span>dsfsdf</span>
    <p class="tooltip">
      Deze data kan tijdelijke promoties bevatten.<br/>
      Colruyt geeft dit niet expliciet aan in hun prijzen overzicht.
    </p>
  </div>

  <div class="header">
    <h3>Sterkste stijgers</h3>
    <span>van vandaag</span>
  </div>
  {#if increases.length === 0}
    <p>
      Door een foutje op de server kunnen er voor
      vandaag geen resulaten worden weergegeven
    </p>
  {:else}
    <div class="grid-container">
      {#each increases as increase}
        <PriceChangeCard priceChange={increase} />
      {/each}
    </div>
  {/if}
  
  <div class="header">
    <h3>Drastische dalers</h3>
    <span>van vandaag</span>
  </div>
  {#if decreases.length === 0}
    <p>
      Door een foutje op de server kunnen er voor
      vandaag geen resulaten worden weergegeven
    </p>
  {:else}
    <div class="grid-container">
      {#each decreases as decrease}
        <PriceChangeCard priceChange={decrease} />
      {/each}
    </div>
  {/if}

</div>

<style>
  #content {
    max-width: 1000px;
    margin: auto;
    padding: var(--m-small);
    overflow-x: hidden;
    position: relative;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    padding: 1px;
    max-width: 100%;
    background-color: #bbb;
  }
  .header {
    margin: var(--m-small);
    padding: var(--m-small);
  }
  .header h3 {
    display: inline-block;
  }
  .header span {
    font-size: var(--font-size-tiny);
  }

  .tooltip-container {
    float: right;
  }

  @media (min-width: 650px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
    #content {
      padding: var(--m-normal) var(--m-large);
    }
  }
  @media (min-width: 900px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
