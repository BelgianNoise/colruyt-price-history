<script lang="ts">
  import type { RootLoadResults } from "./+page.server";
  import PriceChangeCard from "$lib/components/price-change-card.svelte";
  import InfoSVG from "$lib/svgs/info.svelte";
  export let data: RootLoadResults;
  let screenSize: number;

  $: priceChanges = data.priceChanges.sort((a, b) => b.priceChangePercentage - a.priceChangePercentage);
  $: showAmount = screenSize > 900 ? 8 : 6;
  $: increases = priceChanges.slice(0, showAmount).filter(priceChange => priceChange.priceChangePercentage > 0);
  $: decreases = priceChanges
    .slice(priceChanges.length - showAmount, priceChanges.length)
    .filter(priceChange => priceChange.priceChangePercentage < 0)
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
    position: relative;
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
</style>
