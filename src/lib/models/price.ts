export interface Price {
  basicPrice: number;
  isRedPrice: boolean;
  measurementUnit: string;
  measurementUnitPrice: number;
  recommendedQuantity: string;
  promotion: string;
}

export const parseToPrice = (input: Record<string, any>): Price => ({
  basicPrice: input.basic_price,
  isRedPrice: input.is_red_price,
  measurementUnit: input.measurement_unit,
  measurementUnitPrice: input.measurement_unit_price,
  recommendedQuantity: input.recommended_quantity,
  // some data has promotion as NULL, mistakes were made
  promotion: input.promotion === 'NULL' ? '' : input.promotion,
});

export const parsePriceToString = (price: Price | number): string => {
  let numPrice: number;
  if (typeof price === 'object') {
    numPrice = price.basicPrice;
  } else {
    numPrice = price;
  }
  return `€ ${Math.round(numPrice * 100) / 100}`;
};

export const parseUnitToString = (price: Price | string): string => {
  let unit: string;
  if (typeof price === 'object') {
    unit = price.measurementUnit;
  } else {
    unit = price;
  }
  
  switch (unit) {
    case 'K': return 'kg';
    case 'L': return 'l';
    case 'S': return 'stuk';
    default: return unit;
  }
};
