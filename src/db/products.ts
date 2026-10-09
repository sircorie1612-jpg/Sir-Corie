import { db } from './index.ts';
import { products } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function getDbProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  } catch (error) {
    console.error("Failed to query products:", error);
    throw new Error("Failed to load products from database.", { cause: error });
  }
}

export async function insertDbProduct(productData: typeof products.$inferInsert) {
  try {
    const result = await db.insert(products)
      .values(productData)
      .onConflictDoUpdate({
        target: products.id,
        set: productData,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Failed to insert product:", error);
    throw new Error("Failed to save product in database.", { cause: error });
  }
}

export async function deleteDbProduct(productId: string) {
  try {
    const result = await db.delete(products).where(eq(products.id, productId)).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Failed to delete product from database.", { cause: error });
  }
}

export async function toggleDbProductStock(productId: string, inStock: boolean) {
  try {
    const result = await db.update(products)
      .set({ inStock })
      .where(eq(products.id, productId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Failed to toggle product stock:", error);
    throw new Error("Failed to update product stock status.", { cause: error });
  }
}
