import { db } from './index.ts';
import { salesRecords } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getDbSalesRecords(periodType?: string) {
  try {
    if (periodType) {
      return await db.select().from(salesRecords).where(eq(salesRecords.periodType, periodType));
    }
    return await db.select().from(salesRecords);
  } catch (error) {
    console.error("Failed to query sales records:", error);
    throw new Error("Failed to load sales records from database.", { cause: error });
  }
}

export async function insertDbSalesRecord(recordData: typeof salesRecords.$inferInsert) {
  try {
    const result = await db.insert(salesRecords).values(recordData).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to insert sales record:", error);
    throw new Error("Failed to save sales record in database.", { cause: error });
  }
}
