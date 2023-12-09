<script lang="ts">
  import type { PP } from "$lib/models/pp";
  import PPListItem from "./pp-list-item.svelte";
  export let pps: PP[]; 
</script>

<div id="container">
  {#each pps as pp}
    <PPListItem {pp} />
  {/each}
</div>

<style>
  #container {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 1px;
    background-color: #bbb;
    border: 1px solid #bbb;
    overflow: hidden;
  }
  @media (min-width: 900px) {
    #container {
      grid-template-columns: 50% 50%;
    }
  }
</style>
