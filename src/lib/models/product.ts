import { parseToPrice, type Price } from "./price";

export interface Product {
  productId: string;
  name: string;
  longName: string;
  shortName: string;
  content: string;
  fullImage: string;
  squareImage: string;
  thumbnail: string;
  commercialArticleNumber: string;
  technicalArticleNumber: string;
  alcoholVolume: string;
  countryOfOrigin: string;
  ficCode: string;
  isBiffe: boolean;
  isBio: boolean;
  isExclusivelySolidInLuxembourg: boolean;
  isNew: boolean;
  isPrivateLabel: boolean;
  isWeightArticle: boolean;
  orderUnit: string;
  recentQuantityOfStockUnits: string;
  weightconversionFactor: string;
  brand: string;
  businessDomain: string;
  isAvailable: boolean;
  seoBrand: string;
  topCategoryId: string;
  topCategoryName: string;
  walkRouteSequenceNumber: number;
  price: Price;
}

export const parseToProduct = (input: Record<string, any>): Product => ({
  productId: input.id,
  name: input.name,
  longName: input.long_name,
  shortName: input.short_name,
  content: input.content,
  fullImage: input.full_image,
  squareImage: input.square_image,
  thumbnail: input.thumbnail,
  commercialArticleNumber: input.commercial_article_number,
  technicalArticleNumber: input.technical_article_number,
  alcoholVolume: input.alcohol_volume,
  countryOfOrigin: input.country_of_origin,
  ficCode: input.fic_code,
  isBiffe: input.is_biffe,
  isBio: input.is_bio,
  isExclusivelySolidInLuxembourg: input.is_exclusively_solid_in_luxembourg,
  isNew: input.is_new,
  isPrivateLabel: input.is_private_label,
  isWeightArticle: input.is_weight_article,
  orderUnit: input.order_unit,
  recentQuantityOfStockUnits: input.recent_quantity_of_stock_units,
  weightconversionFactor: input.weightconversion_factor,
  brand: input.brand,
  businessDomain: input.business_domain,
  isAvailable: input.is_available,
  seoBrand: input.seo_brand,
  topCategoryId: input.top_category_id,
  topCategoryName: input.top_category_name,
  walkRouteSequenceNumber: input.walk_route_sequence_number,
  price: parseToPrice(input),
});
