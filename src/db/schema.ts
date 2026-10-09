import { pgTable, text, serial, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

// Users table - identifier is Firebase Auth uid
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('customer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Products table - synced with catalog
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  size: text('size').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  image: text('image').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  inStock: boolean('in_stock').default(true).notNull(),
  isPopular: boolean('is_popular').default(false).notNull(),
  badge: text('badge'),
  ffaLevel: text('ffa_level').default('<1.8% FFA'),
  smokePoint: text('smoke_point').default('232°C'),
  sudanDyeFree: boolean('sudan_dye_free').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Sales records table - weekly, monthly, yearly
export const salesRecords = pgTable('sales_records', {
  id: serial('id').primaryKey(),
  periodType: text('period_type').notNull(), // 'weekly' | 'monthly' | 'yearly'
  periodLabel: text('period_label').notNull(),
  litresSold: integer('litres_sold').notNull(),
  revenue: integer('revenue').notNull(),
  ordersCount: integer('orders_count').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  items: text('items').notNull(), // JSON serialized items
  totalAmount: integer('total_amount').notNull(),
  status: text('status').default('confirmed').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
