<script lang="ts">
  import type { Product } from "$lib/models/product";
  import Card from "./card.svelte";

  export let product: Product;

  const handleClick = () => {
    window.location.href = `/product/${product.id}`;
  };

  $: name = 
    product.longName.charAt(0).toUpperCase() +
    product.longName.slice(1).replaceAll(/([&\.])/gim, ' $1 ')
</script>

<Card
  hideHeader
  onClick={handleClick}
>
  <div id="body" slot="body">
    <img src={product.squareImage} alt="product" loading="lazy">
    <span id="product-name">{name}</span>
    <span>{product.content}</span>
    {#if product.price.promotion || product.price.quantityPriceQuantity}
      <span id="promo">Actie</span>
    {/if}
  </div>
  <slot name="footer" slot="footer" />
</Card>

<style>
  #body {
    display: flex;
    flex-direction: column;
    gap: var(--m-small);
    position: relative;
  }
  #body > img {
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
  }
  #product-name {
    font-weight: bold;
    overflow-wrap: break-word;
    font-size: var(--font-size-tiny);
  }
  #promo {
    position: absolute;
    top: 0;
    left: calc(var(--m-small) * -1);
    background-color: var(--color-colruyt-red);
    color: var(--color-background);
    padding: var(--m-tiny) var(--m-small);
    font-size: var(--font-size-tiny);
    font-weight: bold;
  }

  @media (min-width: 900px) {
    #product-name {
      font-size: var(--font-size-small);
    }
  }
</style>
