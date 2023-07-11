import { parseToPrice, type Price } from "$lib/models/price";
import { parseToProduct, type Product } from "$lib/models/product";
import { dbPool } from "$lib/server/db";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {

  const productId = event.url.searchParams.get('productId');
  if (!productId || productId === 'undefined') return json([], { status: 400 });

  const result = await dbPool.query(`
    SELECT p.*, pr.id as price_id, pr.*
    FROM
      products.product as p
      LEFT JOIN
      products.price as pr
      ON p.id = pr.product_id
    WHERE
      p.id = $1
    ORDER BY pr.time DESC
    LIMIT 1
  `, [ productId ]);
  
  const products: Product[] = result.rows.map((row) => parseToProduct(row));

  if (products.length === 0) return json([], { status: 404 });
  if (products.length > 1) return json([], { status: 500 });

  const pricesResult = await dbPool.query(`
    SELECT *
    FROM products.price
    WHERE product_id = $1
    ORDER BY time DESC
  `, [ productId ]);

  const prices: Price[] = pricesResult.rows.map((row) => parseToPrice(row));

  return json({
    product: products[0],
    prices: prices,
  });
}