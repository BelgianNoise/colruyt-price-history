<script lang="ts">
  import type { PriceChange } from "$lib/models/price-change";
  import ProductCard from "./product-card.svelte";

  export let priceChange: PriceChange;

  $: percChange = Math.round(priceChange.priceChangePercentage * 100);
</script>

<ProductCard product={priceChange}>
  <div slot="footer">
    <span
      id="perc-change"
    >{percChange > 0 ? '+' : ''}{percChange}%</span>
    <div id="prices">
      <span
        id="old-price"
        class:red={percChange > 0}
      >€ {priceChange.oldPrice.basicPrice}</span>
      <span
        id="new-price"
        class:red={percChange < 0}
      >€ {priceChange.price.basicPrice}</span>
    </div>
  </div>
</ProductCard>

<style>
  #old-price {
    text-decoration: line-through;
  }
  .red {
    color: var(--color-colruyt-red);
  }
  div[slot="footer"] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
  #prices {
    border-left: 1px solid var(--color-foreground);
    display: flex;
    flex-direction: column;
    gap: var(--m-tiny);
    padding-left: var(--m-small);
  }
  #perc-change {
    padding-right: var(--m-small);
  }
  #perc-change, #prices {
    font-size: var(--font-size-tiny);
  }
  @media (min-width: 900px) {
    #perc-change, #prices {
      font-size: var(--font-size-small);
    }
  }
</style>
