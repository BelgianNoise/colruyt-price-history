export interface PP {
  productId: number;
  longName: string;
  squareImage: string;
  basicPrice: number;
  benefit: string;
  quantityPrice: number;
  quantityPriceQuantity: string;
  bestPrice: number;
  thirtyDayAvg: number;
  diff: number;
}

export interface PPGCSDOCFORMAT {
  date: string;
  data: PP[];
}
