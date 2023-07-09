import type { Price } from "./price";
import type { Product } from "./product";

export interface PriceChange extends Product {
  priceChange: number;
  priceChangePercentage: number;
  involvesPromotion: boolean;
  price: Price;
  oldPrice: Price;
}
