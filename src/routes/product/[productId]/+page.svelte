<script lang="ts">
  import PricesHistory from "$lib/components/prices-history.svelte";
  import { parsePriceToString, parseUnitToString } from "$lib/models/price";
  import type { ProductLoadResults } from "./+page.server";

  export let data: ProductLoadResults;
  console.log(data);
  $: filteredPrices = data.prices.filter(price => price.isPriceAvailable);
</script>

{#if data.product}
  <div id="content">
    <div id="info-panel">
      {#if data.product.price.promotion || filteredPrices[0]?.quantityPriceQuantity}
        <span id="promo">Actie</span>
      {/if}
      <img src={data.product.squareImage} alt="product">
      <div id="info-grid">
        {#if data.product.brand}
          <span class="info-grid-item-title">merk:</span>
          <span>{data.product.brand}</span>
        {/if}
        <span class="info-grid-item-title">product:</span>
        <span>{data.product.name}</span>
        {#if data.product.content}
          <span class="info-grid-item-title">inhoud:</span>
          <span>{data.product.content}</span>
        {/if}
        {#if data.product.price.basicPrice !== data.product.price.measurementUnitPrice}
          <span class="info-grid-item-title">prijs:</span>
          <span>{parsePriceToString(data.product.price)}</span>
        {/if}
        {#if data.product.price.measurementUnitPrice && data.product.price.measurementUnit}
          <span class="info-grid-item-title">prijs:</span>
          <span>
            {parsePriceToString(data.product.price.measurementUnitPrice)}
            /
            {parseUnitToString(data.product.price.measurementUnit)}
          </span>
        {/if}
        {#if data.product.alcoholVolume && Number(data.product.alcoholVolume) > 0}
          <span class="info-grid-item-title">Alcohol:</span>
          <span>{data.product.alcoholVolume} %</span>
        {/if}
        {#if data.product.countryOfOrigin}
          <span class="info-grid-item-title">oorsprong:</span>
          <span>{data.product.countryOfOrigin}</span>
        {/if}
        <span class="info-grid-item-title">bio:</span>
        <span>{data.product.isBio ? 'Ja' : 'Neen'}</span>
        <!-- <span class="info-grid-item-title">biffe:</span>
        <span>{data.product.isBiffe ? 'Ja' : 'Neen'}</span> -->
        <span class="info-grid-item-title">beschikbaar:</span>
        <span>{data.product.isAvailable ? 'Ja' : 'Neen'}</span>
        <span class="info-grid-item-title"><!-- EMPTY --></span>
        <span><a target="_blank" referrerpolicy="no-referrer" href="https://www.colruyt.be/nl/producten/{data.product.commercialArticleNumber}">bekijk op colruyt.be</a></span>
      </div>
    </div>
    <div id="promos-container">
      {#each data.promotions as promo}
        {#each promo.benefits as benefit}
          <div class="promo-container">
            <div class="promo-detail">
              <p class="promo-percentage">- {benefit.percentage}%</p>
              <p>vanaf {benefit.minLimit} {parseUnitToString(benefit.unit)}</p>
            </div>
            <div class="promo-dates">
              <p>
                {new Date(promo.startDate).getDate()}/{new Date(promo.startDate).getMonth()+1}
                -
                {new Date(promo.endDate).getDate()}/{new Date(promo.endDate).getMonth()+1}
              </p>
            </div>
          </div>
        {/each}
      {/each}
      {#if filteredPrices[0]?.quantityPriceQuantity }
        <div class="promo-container">
          <div class="promo-detail">
            <p class="promo-percentage">€ {Number(filteredPrices[0].quantityPrice)}</p>
            <p>vanaf {Number(filteredPrices[0].quantityPriceQuantity)} {parseUnitToString(data.product.isWeightArticle ? 'K' : 'S')}</p>
          </div>
        </div>
      {/if}
    </div>
    {#if filteredPrices.length > 2}
      <PricesHistory prices={filteredPrices} />
    {:else}
      <p id="not-enough-data">
        Voor dit product hebben we niet genoeg data om een
        grafiek op te stellen :(
      </p>
    {/if}
  </div>
{:else}
  <div class="empty">
    <p>Product niet gevonden!</p>
    <a href="/">Terug naar de startpagina</a>
  </div>
{/if}

<style>
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--m-normal);
  }
  #not-enough-data {
    text-align: center;
    width: 70%;
  }
  #info-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  #info-panel > img {
    width: 70%;
    margin: auto;
  }
  #info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: var(--m-small);
    grid-template-areas: "name price";
  }
  .info-grid-item-title {
    font-weight: bold;
    width: 100%;
    text-align: right;
  }
  #promo {
    position: absolute;
    top: var(--m-small);
    left: var(--m-small);
    background-color: var(--color-colruyt-red);
    color: var(--color-background);
    padding: var(--m-tiny) var(--m-small);
    font-size: var(--font-size-tiny);
    font-weight: bold;
  }
  #promos-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--m-normal);
    flex-wrap: wrap;
  }
  .promo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--m-tiny);
    background-color: var(--color-background-dark);
    padding: var(--m-normal);
    border-radius: var(--m-small);
  }
  .promo-container .promo-detail {
    display: flex;
    flex-direction: row;
    gap: var(--m-small);
    align-items: end;
    justify-content: left;
    color: var(--color-colruyt-red);
  }
  .promo-container .promo-percentage {
    font-weight: bold;
    font-size: var(--font-size-huge);
  }
  .promo-container .promo-dates {
    color: var(--color-foreground-light);
    font-size: var(--font-size-tiny);
  }
  @media (min-width: 700px) {
    #info-panel {
      flex-direction: row;
      gap: var(--m-normal);
    }
    #info-panel > img {
      width: 30%;
      margin: 0;
    }
    #info-grid {
      flex: 1;
      border-left: 1px solid var(--color-foreground);
    }
  }
</style>
