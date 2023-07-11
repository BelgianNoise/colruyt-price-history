import { parseToProduct, type Product } from "$lib/models/product";
import { dbPool } from "$lib/server/db";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {

  const query = event.url.searchParams.get('query');
  if (!query) return json([], { status: 400 });

  const result = await dbPool.query(`
    SELECT p.*, pr.id as price_id, pr.*, p.id
    FROM
      products.product as p
      INNER JOIN
      products.price as pr
      ON p.id = pr.product_id
    WHERE
      long_name ILIKE '%' || $1 || '%'
      AND
      pr.id = (
        SELECT id
        FROM products.price
        WHERE product_id = p.id
        ORDER BY time DESC
        LIMIT 1
      )
    LIMIT 100
  `, [ query ]);

  const products: Product[] = result.rows.map((row) => parseToProduct(row));
  console.log('====', products)
  return json(products);
}