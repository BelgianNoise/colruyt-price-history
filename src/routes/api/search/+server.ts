import { parseToProduct, type Product } from "$lib/models/product";
import { connectToDB } from "$lib/server/db";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {

  const query = event.url.searchParams.get('query');
  if (!query) return json([], { status: 400 });

  const client = await connectToDB();

  const result = await client.query(`
    SELECT *
    FROM products.product
    WHERE long_name ILIKE '%' || $1 || '%'
  `, [ query ]);
  
  const products: Product[] = result.rows.map((row) => parseToProduct(row));

  return json(products);
}