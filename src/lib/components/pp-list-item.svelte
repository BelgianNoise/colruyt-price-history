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
        <div class="diff-container">
          <span class="diff">-{pp.diff}%</span>
        </div>
        <div>
          <p class="quantity">vanaf {quantity}</p>
          <p class="best-price">€{Math.round(pp.bestPrice * 100)/100}</p>
        </div>
      </div>
      <p class="avg">gem laatste 30 dagen: €{Math.round(pp.thirtyDayAvg * 100)/100}</p>
    </div>
  </div>
</Card>

<style>
  .long-name {
    font-size: var(--font-size-small);
    font-weight: bold;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .avg {
    font-size: 0.7rem;
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
    font-size: 2.2rem;
    line-height: 2.2rem;
    font-weight: bold;
    margin: 0;
    text-align: right;
    color: var(--color-colruyt-red);
  }
  .diff-container {
    height: 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .diff {
    color: var(--color-foreground-inverse);
    background-color: var(--color-colruyt-red);
    padding: 0.2rem var(--m-small);
    border-radius: var(--m-tiny);
    font-size: 1rem;
    line-height: 1rem;
  }
  .quantity {
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: var(--color-colruyt-red);
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
    max-width: 20%;
    height: 100px;
    object-fit: contain;
  }
  div[slot="body"] > div {
    flex: 1;
  }
  hr {
    margin-top: var(--m-tiny);
  }
</style>
