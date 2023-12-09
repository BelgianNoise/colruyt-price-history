<script lang="ts">
  import type { PP } from "$lib/models/pp";
  import Card from "./card.svelte";

  export let pp: PP;
  const handleClick = () => {
    window.location.href = `/product/${pp.productId}`;
  };

  const calcQuantity = () => {
    try {
      const qpq = pp.quantityPriceQuantity ? Number(pp.quantityPriceQuantity) : 1;
      const bqStrings = pp.benefit ? pp.benefit.split(",").map(b => b.split("_")[1]) : [ 1 ];
      const bq = Math.max(...bqStrings.map(b => Number(b)));
      return Math.max(qpq, bq);
    } catch {
      return '_';
    }
  }

  $: quantity = calcQuantity();
</script>


<Card
  hideFooter
  onClick={handleClick}
>
  <div slot="header">
    <p class="long-name">{pp.longName}</p>
    <hr/>
  </div>
  <div slot="body">
    <img src={pp.squareImage} alt={pp.longName} loading="lazy"/>
    <div class="info-container">
      <div class="detail-info-container">
        <div>
          <span class="diff">-{pp.diff}%</span>
          <p class="quantity">vanaf {quantity}</p>
        </div>
        <p class="best-price">€{Math.round(pp.bestPrice * 100)/100}</p>
      </div>
      <p class="avg">gem laatste 30 dagen: €{Math.round(pp.thirtyDayAvg * 100)/100}</p>
    </div>
  </div>
</Card>

<style>
  .long-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .avg {
    font-size: 0.8rem;
    text-align: right;
  }
  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
  .detail-info-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: end;
    gap: var(--m-small);
  }
  .best-price {
    font-size: 60px;
    line-height: 60px;
    font-weight: bold;
    margin: 0;
    text-align: right;
    color: var(--color-colruyt-red);
  }
  .diff {
    color: var(--color-foreground-inverse);
    background-color: var(--color-colruyt-red);
    padding: 5px var(--m-small);
    border-radius: var(--m-tiny);
    font-size: 25px;
  }
  .quantity {
    font-size: 15px;
    line-height: 15px;
    color: var(--color-colruyt-red);
    margin-top: 10px;
    text-align: right;
  }

  div[slot="body"] {
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: var(--m-normal);
  }
  div[slot="body"] > img {
    width: 100px;
    height: 100px;
  }
  div[slot="body"] > div {
    flex: 1;
  }
  hr {
    margin-top: var(--m-tiny);
  }
</style>
