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
