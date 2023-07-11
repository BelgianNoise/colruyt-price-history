<script lang="ts">
  import type { Price } from "$lib/models/price";

  export let prices: Price[] = [];
</script>

<div id="content">
  <p>TODO replace with ChartJS or diff line chart library</p>
  {#each prices as price}
    <p class="price-date">{price.basicPrice}</p>
  {/each}
</div>

<style>
  * {
    text-align: center;
  }
</style>
