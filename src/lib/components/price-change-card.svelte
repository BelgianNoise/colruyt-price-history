<script lang="ts">
  import type { PriceChange } from "$lib/models/price-change";
  import Card from "./card.svelte";

  export let priceChange: PriceChange;

  const handleClick = () => {
    console.log('gooo', priceChange.id)
    window.location.href = `/product/${priceChange.id}`;
  };

  $: percChange = Math.round(priceChange.priceChangePercentage * 100);
  $: name = 
    priceChange.name.charAt(0).toUpperCase() +
    priceChange.name.slice(1).replaceAll(/([&\.])/gim, ' $1 ')
</script>

<Card
  hideHeader
  onClick={handleClick}
>
  <div id="body" slot="body">
    <img src={priceChange.squareImage} alt="product" loading="lazy">
    <span id="product-name">{name}</span>
  </div>
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
</Card>

<style>
  #body {
    display: flex;
    flex-direction: column;
    gap: var(--m-small);
  }
  #body > img {
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
  }
  #product-name {
    font-weight: bold;
    overflow-wrap: break-word;
  }
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
  #perc-change, #prices, #product-name {
    font-size: var(--font-size-tiny);
  }
  @media (min-width: 900px) {
    #perc-change, #prices, #product-name {
      font-size: var(--font-size-small);
    }
  }
</style>
