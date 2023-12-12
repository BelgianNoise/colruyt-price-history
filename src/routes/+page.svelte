<script lang="ts">
  import type { RootLoadResults } from "./+page.server";
  import { slide } from 'svelte/transition';
  import PriceChangeCard from "$lib/components/price-change-card.svelte";
  import PPList from "$lib/components/pp-list.svelte";
  import InfoSVG from "$lib/svgs/info.svelte";
  import ChevronDownSVG from "$lib/svgs/chevron-down.svelte";
  import { onMount } from 'svelte';

  export let data: RootLoadResults;
  let screenSize: number;
  let showIncreases = false;
  let showDecreases = false;
  let showPP = false;
  let showVV = false;
  let ready = false;
  onMount(() => ready = true);

  $: showAmount = screenSize > 900 ? 8 : 6;
  $: increases = data.ss.slice(0, showAmount);
  $: decreases = data.dd.slice(0, showAmount);
  $: showVV = ready

</script>

<svelte:window bind:innerWidth={screenSize} />

<div id="content">

  <div class="header" role="button" tabindex="0"
    class:open={showVV}
    on:click={() => showVV = !showVV}
    on:keydown={(e) => {if (e.key === "Enter") showVV = !showVV}}
  >
    <h3>Vrome Verminderingen</h3>
    <div class="tooltip-container">
      <InfoSVG />
      <p class="tooltip">
        Opmerkelijke nieuwe kortingen van vandaag (hoeveelheidskortingen in rekening gebracht).
      </p>
    </div>
    <div class="drop-down-icon" class:flip={showVV}>
      <ChevronDownSVG />
    </div>
  </div>
  {#if showVV}
    <div class="list-container"
      in:slide={{ duration: 500 }}
      out:slide={{ duration: 500 }}
    >
      {#if data.ppNew.length === 0}
        <p>
          Geen opmerkelijke nieuwe kortingen vandaag ¯\_(ツ)_/¯
        </p>
      {:else}
        <PPList pps={data.ppNew} />
        <a class="link" href="/pp">Toon Alles >>></a>
      {/if}
    </div>
  {/if}

  <div class="header" role="button" tabindex="0"
    class:open={showPP}
    on:click={() => showPP = !showPP}
    on:keydown={(e) => {if (e.key === "Enter") showPP = !showPP}}
  >
    <h3>Prettige Prijzen</h3>
    <div class="tooltip-container">
      <InfoSVG />
      <p class="tooltip">
        Hoogste kortingen op dit moment, prijzen vergeleken met het gemiddelde
        van 30 dagen. In tegenstelling tot de `Vrome Verminderingen` zijn deze
        niet beperkt tot NIEUWE kortingen van vandaag.
      </p>
    </div>
    <div class="drop-down-icon" class:flip={showPP}>
      <ChevronDownSVG />
    </div>
  </div>
  {#if showPP}
    <div class="list-container"
      in:slide={{ duration: 500 }}
      out:slide={{ duration: 500 }}
    >
      {#if data.pp.length === 0}
        <p>
          Door een foutje op de server kunnen er voor
          vandaag geen resulaten worden weergegeven
        </p>
      {:else}
        <PPList pps={data.pp} />
        <a class="link" href="/vv">Toon Alles >>></a>
      {/if}
    </div>
  {/if}

  <div class="header" role="button" tabindex="0"
    class:open={showDecreases}
    on:click={() => showDecreases = !showDecreases}
    on:keydown={(e) => {if (e.key === "Enter") showDecreases = !showDecreases}}
  >
    <h3>Drastische dalers</h3>
    <div class="tooltip-container">
      <InfoSVG />
      <p class="tooltip">
        Grootste prijsdalingen van vandaag, vergeleken met de eenheidsprijs
        van gisteren.
      </p>
    </div>
    <div class="drop-down-icon" class:flip={showDecreases} >
      <ChevronDownSVG />
    </div>
  </div>
  {#if showDecreases}
    <div class="list-container"
      in:slide={{ duration: 500 }}
      out:slide={{ duration: 500 }}
    >
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
        <a class="link" href="/dd">Toon Alles >>></a>
      {/if}
    </div>
  {/if}

  <div class="header" role="button" tabindex="0"
    class:open={showIncreases}
    on:click={() => showIncreases = !showIncreases}
    on:keydown={(e) => {if (e.key === "Enter") showIncreases = !showIncreases}}
  >
    <h3>Sterkste stijgers</h3>
    <div class="tooltip-container">
      <InfoSVG />
      <p class="tooltip">
        Grootste prijsstijgingen van vandaag, vergeleken met de eenheidsprijs
        van gisteren.
      </p>
    </div>
    <div class="drop-down-icon" class:flip={showIncreases}>
      <ChevronDownSVG />
    </div>
  </div>
  {#if showIncreases}
    <div class="list-container"
      in:slide={{ duration: 500 }}
      out:slide={{ duration: 500 }}
    >
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
        <a class="link" href="/ss">Toon Alles >>></a>
      {/if}
    </div>
  {/if}
</div>

<style>
  #content {
    position: relative;
  }
  .header {
    position: relative;
    margin-top: var(--m-small);
    padding: var(--m-normal);
    padding-right: var(--m-huge);
    cursor: pointer;
    background-color: var(--color-background-dark);
    border-radius: var(--m-small);
    border: 1px solid var(--color-foreground-light);
    display: flex;
    flex-direction: row;
    gap: var(--m-normal);
    align-items: center;
  }
  .header.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  .header h3 {
    display: inline-block;
  }
  .header span {
    font-size: var(--font-size-tiny);
  }
  .header .tooltip-container {
    display: inline-block;
    max-height: var(--font-size-large);
    max-width: var(--font-size-large);
  }

  .list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list-container > p {
    padding: var(--m-small);
    border: 1px solid #222;
    border-top: none;
    border-bottom-left-radius: var(--m-small);
    border-bottom-right-radius: var(--m-small);
  }
  .link {
    padding: var(--m-normal);
    color: var(--color-colruyt);
    display: inline-block;
    text-decoration: none;
  }

  .drop-down-icon.flip {
    transform: rotate(180deg) translateY(50%);
  }
  .drop-down-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    right: var(--m-normal);
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.2s;
  }
</style>
