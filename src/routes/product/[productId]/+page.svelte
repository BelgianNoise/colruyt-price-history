<script lang="ts">
  import type { ProductLoadResults } from "./+page.server";

  export let data: ProductLoadResults;
</script>

{#if data.product}
  <p>{data.product.longName} - {data.product.price.basicPrice} - {data.prices.length}</p>
  <p>{data.product.price.promotion}</p>
  <p>{data.prices.map((p) => p.basicPrice)}</p>
{:else}
  <p>Product niet gevonden</p>
{/if}

<style>

</style>
