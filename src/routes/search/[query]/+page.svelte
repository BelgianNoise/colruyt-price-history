<script lang="ts">
  import ProductCard from "$lib/components/product-card.svelte";
  import { parsePriceToString, parseUnitToString } from "$lib/models/price";
  import type { SearchLoadResults } from "./+page.server";

  export let data: SearchLoadResults;
</script>

<div id="content">
  <span>Zoekresultaten voor "<strong>{data.query}</strong>"</span>
  {#if data.products.length === 0}
    <span>Geen resultaten gevonden</span>
  {:else}
    <div class="grid-container">
      {#each data.products as product}
        <ProductCard product={product}>
          <div slot="footer">
            <span id="price">
              {parsePriceToString(product.price)}
              {product.weightconversionFactor !== '0'
                ? ` / ${parseUnitToString(product.price)}`
                : ''
              }
            </span>
          </div>
        </ProductCard>
      {/each}
    </div>
  {/if}
</div>

<style>
  #content {
    display: flex;
    flex-direction: column;
    gap: var(--m-small);
  }
  #price {
    float: right;
    font-size: var(--font-size-normal);
  }
</style>
