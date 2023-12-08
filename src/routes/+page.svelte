<script lang="ts">
  import type { RootLoadResults } from "./+page.server";
  import { slide } from 'svelte/transition';
  import PriceChangeCard from "$lib/components/price-change-card.svelte";
  import InfoSVG from "$lib/svgs/info.svelte";
  import ChevronDownSVG from "$lib/svgs/chevron-down.svelte";
  import { onMount } from 'svelte';

  export let data: RootLoadResults;
  let screenSize: number;
  let showIncreases = false;
  let showDecreases = false;
  let showPP = false;
  let ready = false;
  onMount(() => ready = true);

  $: showAmount = screenSize > 900 ? 8 : 6;
  $: increases = data.ss.slice(0, showAmount);
  $: decreases = data.dd.slice(0, showAmount);
  $: showPP = ready

</script>

<svelte:window bind:innerWidth={screenSize} />

<div id="content">

  <!-- <div class="tooltip-container">
    <InfoSVG />
    <p class="tooltip">
      Deze data kan prijsveranderingen door andere winkelketens bevatten.<br/>
      Colruyt geeft dit niet expliciet aan in hun prijzen overzicht.<br/>
      De 'Prettige Prijzen' worden enkele keren per dag opnieuw berekend.
    </p>
  </div> -->

  <div class={`header ${showPP ? 'open' : ''}`} role="button" tabindex="0"
    on:click={() => showPP = !showPP}
    on:keydown={(e) => {if (e.key === "Enter") showPP = !showPP}}
  >
  <h2>Prettige Prijzen</h2>
  <span>Hoogste kortingen op dit moment</span>
    <div class={`drop-down-icon ${showPP ? 'flip' : ''}`}>
      <ChevronDownSVG />
    </div>
  </div>
  {#if showPP}
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
        <p>TODO</p>
        <a class="link" href="/pp">Toon Alles</a>
      {/if}
    </div>
  {/if}

  <div class={`header ${showIncreases ? 'open' : ''}`} role="button" tabindex="0"
    on:click={() => showIncreases = !showIncreases}
    on:keydown={(e) => {if (e.key === "Enter") showIncreases = !showIncreases}}
  >
    <h2>Sterkste stijgers</h2>
    <span>van vandaag</span>
    <div class={`drop-down-icon ${showIncreases ? 'flip' : ''}`}>
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
        <a class="link" href="/ss">Toon Alles</a>
      {/if}
    </div>
  {/if}
  
  <div class={`header ${showDecreases ? 'open' : ''}`} role="button" tabindex="0"
    on:click={() => showDecreases = !showDecreases}
    on:keydown={(e) => {if (e.key === "Enter") showDecreases = !showDecreases}}
  >
    <h2>Drastische dalers</h2>
    <span>van vandaag</span>
    <div class={`drop-down-icon ${showIncreases ? 'flip' : ''}`}>
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
        <a class="link" href="/dd">Toon Alles</a>
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
    cursor: pointer;
    background-color: var(--color-background-dark);
    border-radius: var(--m-small);
    border: 1px solid var(--color-foreground-light);
  }
  .header.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  .header h2 {
    display: inline-block;
  }
  .header span {
    font-size: var(--font-size-tiny);
  }
  .tooltip-container {
    position: absolute;
    right: 0;
    top: 0;
  }

  .list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .link {
    padding: var(--m-normal) var(--m-large);
    border: 2px solid var(--color-colruyt);
    border-radius: var(--m-large);
    color: var(--color-colruyt);
    margin-top: var(--m-normal);
    display: inline-block;
    text-decoration: none;
  }
  .link:hover {
    background-color: var(--color-colruyt-lighter);
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
