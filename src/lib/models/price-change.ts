import type { Price } from "./price";
import type { Product } from "./product";

export interface PriceChange extends Product {
  priceChange: number;
  priceChangePercentage: number;
  involvesPromotion: boolean;
  oldPrice: Price;
}

export interface PriceChangeGCSDOCDORMAT {
  date: Date;
  priceChanges: PriceChange[];
}
