<script lang="ts">
  import PriceChangeCard from "$lib/components/price-change-card.svelte";
  import type { SSLoadResults } from "./+page.server";

  export let data: SSLoadResults;

</script>

{#if data.ss.length === 0}
  <p>
    Door een foutje op de server kunnen er voor
    vandaag geen resulaten worden weergegeven
  </p>
{:else}
  <div class="grid-container">
    {#each data.ss as decrease}
      <PriceChangeCard priceChange={decrease} />
    {/each}
  </div>
{/if}

<style>

</style>
