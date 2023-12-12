<script lang="ts">
  import PPList from "$lib/components/pp-list.svelte";
  import type { PP } from "$lib/models/pp";
  import { debounce } from "$lib/utils/debounce";
  import type { VVLoadResults } from "./+page.server";

  export let data: VVLoadResults;
  let searcInputhValue = "";
  let searchValue = "";

  const filterPPs = (): PP[] => {
    const res = data.pp.filter((pp) =>
      pp.longName.toLowerCase().includes(searchValue.toLowerCase())
    );
    return res;
  }

  $: filteredPPs = searchValue.length > 0 ? filterPPs() : data.pp;
  // Setting this as a listening variable so that the amount is reset whenever
  // the search value changes.
  $: showAmount = filteredPPs.length > 100 ? 100 : filteredPPs.length;

  const doSearch = () => { searchValue = searcInputhValue; }
  const search = debounce(() => doSearch());
  const showMore = () => { showAmount += 100; }
</script>

{#if data.pp.length === 0}
  <p>
    Geen opmerkelijke nieuwe kortingen vandaag ¯\_(ツ)_/¯
  </p>
{:else}
  <input
    type="text"
    placeholder="Zoeken in de vrome verminderingen..."
    bind:value={searcInputhValue}
    on:keydown={() => search()}
  />
  <PPList pps={filteredPPs.slice(0,showAmount)} />
  {#if showAmount < filteredPPs.length}
    <button on:click={() => showMore()}>
        meer resultaten laden ...
    </button>
  {/if}
{/if}

<style>
  input {
    width: calc(100% - var(--m-normal) * 2);
    max-width: 600px;
    padding: var(--m-small) var(--m-normal);
    border: 1px solid #222;
    margin: 0 auto;
    margin-bottom: var(--m-normal);
    font-size: var(--font-size-small);
  }
  button {
    color: var(--color-colruyt);
    padding: var(--m-small);
    padding-top: var(--m-normal);
    width: auto;
  }
</style>
