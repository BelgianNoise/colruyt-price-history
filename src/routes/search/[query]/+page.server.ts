import type { Product } from '$lib/models/product';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { BASE_URL } from '$env/static/private';

export interface SearchLoadResults {
  query: string;
  products: Product[];
}

type SearchLoadParams = {
  query: string;
}

export async function load(
  event: ServerLoadEvent<SearchLoadParams, Omit<unknown, never>, '/search/[query]'>,
): Promise<SearchLoadResults> {

  let products: Product[] = [];

  try {
    const url = new URL(`/api/search`, BASE_URL);
    url.searchParams.set('query', event.params.query);
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    if (response.status !== 200) throw new Error('Invalid response');
    products = await response.json();

  } catch (error) {
    console.error(error);
  }
  
	return {
    query: event.params.query,
    products: products,
  }
}
