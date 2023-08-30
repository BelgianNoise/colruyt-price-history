<script lang="ts">
  import type { RootLoadResults } from "./+page.server";
  import PriceChangeCard from "$lib/components/price-change-card.svelte";
  import InfoSVG from "$lib/svgs/info.svelte";

  export let data: RootLoadResults;
  let screenSize: number;
  let showAllIncreases = false;
  let showAllDecreases = false;

  $: priceChanges = data.priceChanges.sort((a, b) => b.priceChangePercentage - a.priceChangePercentage);
  $: showAmount = screenSize > 900 ? 8 : 6;
  $: increases = (showAllIncreases ? priceChanges : priceChanges.slice(0, showAmount))
    .filter(priceChange => priceChange.priceChangePercentage > 0.01);
  $: decreases = (showAllDecreases ? priceChanges : priceChanges.slice(priceChanges.length - showAmount, priceChanges.length))
    .filter(priceChange => priceChange.priceChangePercentage < -0.01)
    .reverse();

</script>

<svelte:window bind:innerWidth={screenSize} />

<div id="content">

  <div class="tooltip-container">
    <InfoSVG />
    <p class="tooltip">
      Deze data kan prijsveranderingen door andere winkelketens bevatten.<br/>
      Colruyt geeft dit niet expliciet aan in hun prijzen overzicht.
    </p>
  </div>

  <div class="header">
    <h2>Sterkste stijgers</h2>
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
    <button on:click={() => showAllIncreases = !showAllIncreases} class="expand-button">
      {#if showAllIncreases}
        Toon minder
      {:else}
        Toon alles
      {/if}
    </button>
  {/if}
  
  <div class="header">
    <h2>Drastische dalers</h2>
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
    <button on:click={() => showAllDecreases = !showAllDecreases} class="expand-button">
      {#if showAllDecreases}
        Toon minder
      {:else}
        Toon alles
      {/if}
    </button>
  {/if}

</div>

<style>
  #content {
    position: relative;
  }
  .header {
    margin: var(--m-small);
    padding: var(--m-small);
  }
  .header h2 {
    display: inline-block;
  }
  .header span {
    font-size: var(--font-size-tiny);
  }
  .tooltip-container {
    float: right;
  }

  .expand-button {
    padding: var(--m-normal);
    border: 2px solid var(--color-colruyt);
    color: var(--color-colruyt);
    margin: 0 auto;
    margin-top: var(--m-normal);
    display: block;
  }
</style>
