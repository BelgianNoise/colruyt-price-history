import { parseToProduct, type Product } from "$lib/models/product";
import { dbPool } from "$lib/server/db";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {

  const query = event.url.searchParams.get('query');
  if (!query) return json([], { status: 400 });
  const lowerCaseQuery = query.toLowerCase();
  const splitQuery = lowerCaseQuery.split(' ');

  const result = await dbPool.query(`
    SELECT p.*, pr.id as price_id, pr.*, p.id
    FROM
      products.product as p
      INNER JOIN
      products.price as pr
      ON p.id = pr.product_id
    WHERE
      (
        long_name ILIKE '%' || $1 || '%'
        OR
        (
          ` + splitQuery.map((_, index) => `long_name ILIKE '%' || $${index+2} || '%'`).join(' AND ') + `
        )
      )
      AND
      pr.id = (
        SELECT id
        FROM products.price
        WHERE product_id = p.id
        ORDER BY time DESC
        LIMIT 1
      )
    LIMIT 100
  `, [ lowerCaseQuery, ...splitQuery ]);

  const products: Product[] = result.rows.map((row) => parseToProduct(row));
  const sorted = products.sort((a, b) => {
    // Put products that contain the exact match first
    if (a.longName.toLowerCase().includes(lowerCaseQuery)) return -1;
    if (b.longName.toLowerCase().includes(lowerCaseQuery)) return 1;
    return 0;
  }).sort((a, b) => {
    // put products first where the query is not part of a different word
    const paddedA = ` ${a.longName.toLowerCase()} `;
    const m = paddedA.match(`[^\\w-]${lowerCaseQuery}[^\\w-]`);
    if (m) return -1;
    const paddedB = ` ${b.longName.toLowerCase()} `;
    const n = paddedB.match(`[^\\w-]${lowerCaseQuery}[^\\w-]`);
    if (n) return 1;
    return 0;
  });

  return json(sorted);
}