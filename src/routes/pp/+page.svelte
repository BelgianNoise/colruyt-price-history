<script lang="ts">
  import PPList from "$lib/components/pp-list.svelte";
  import type { PPLoadResults } from "./+page.server";

  export let data: PPLoadResults;

</script>

{#if data.pp.length === 0}
  <p>
    Door een foutje op de server kunnen er voor
    vandaag geen resulaten worden weergegeven
  </p>
{:else}
  <PPList pps={data.pp} />
{/if}

<style>

</style>
