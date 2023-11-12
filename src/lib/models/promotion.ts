
export interface Promotion {
  promotionId: string;
  startDate: Date;
  endDate: Date;
  benefits: PromotionBenefit[];
  linkedProducts: string[];
}

export interface PromotionBenefit {
  percentage: number;
  minLimit: number;
  unit: string;
}

export function parseToPromotion(row: Record<string, any>): Promotion {
  const splitBenefits = (row.benefit as unknown as string).split(',').map((b) => b.trim());
  const benefits: PromotionBenefit[] = [];
  for (const benefit of splitBenefits) {
    const [percentage, minLimit, unit] = benefit.split('_');
    benefits.push({
      percentage: Number(percentage),
      minLimit: Number(minLimit),
      unit: unit
    });
  }
  return {
    promotionId: row.promotion_id,
    startDate: new Date(row.active_start_date),
    endDate: new Date(row.active_end_date),
    benefits: benefits,
    linkedProducts: (row.linked_products as unknown as string).split(',').map((code) => code.trim())
  };
}
