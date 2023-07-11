import type { Product } from '$lib/models/product';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { BASE_URL } from '$env/static/private';
import type { Price } from '$lib/models/price';

export interface ProductLoadResults {
  product: Product | undefined;
  prices: Price[];
}

type ProductLoadParams = {
  productId: string;
}

export async function load(
  event: ServerLoadEvent<ProductLoadParams, Omit<unknown, never>, '/product/[productId]'>,
): Promise<ProductLoadResults> {

  let product: Product | undefined = undefined;
  let prices: Price[] = [];

  try {
    const url = new URL(`/api/product`, BASE_URL);
    url.searchParams.set('productId', event.params.productId);
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    if (response.status !== 200) throw new Error('Invalid response');
    const result = await response.json();
    product = result.product;
    prices = result.prices;

  } catch (error) {
    console.error(error);
  }
  
	return { product, prices };
}
