import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { getDbProducts, insertDbProduct, deleteDbProduct, toggleDbProductStock } from './src/db/products.ts';
import { getDbSalesRecords, insertDbSalesRecord } from './src/db/sales.ts';
import { getOrCreateUser, getUsers } from './src/db/users.ts';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes for Cloud SQL PostgreSQL Database

  // 1. Get all products from Cloud SQL
  app.get('/api/products', async (req, res) => {
    try {
      const items = await getDbProducts();
      res.json(items);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch products' });
    }
  });

  // 2. Add or update product in Cloud SQL
  app.post('/api/products', async (req, res) => {
    try {
      const {
        id,
        name,
        size,
        price,
        originalPrice,
        image,
        category,
        description,
        inStock,
        isPopular,
        badge,
        ffaLevel,
        smokePoint,
        sudanDyeFree,
      } = req.body;

      if (!id || !name || !size || !price) {
        return res.status(400).json({ error: 'Missing required product fields (id, name, size, price)' });
      }

      const saved = await insertDbProduct({
        id,
        name,
        size,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        image: image || '/src/assets/images/drop_bottle_new.png',
        category: category || 'General',
        description: description || '',
        inStock: inStock !== undefined ? Boolean(inStock) : true,
        isPopular: isPopular !== undefined ? Boolean(isPopular) : false,
        badge: badge || null,
        ffaLevel: ffaLevel || '<1.8% FFA',
        smokePoint: smokePoint || '232°C',
        sudanDyeFree: sudanDyeFree !== undefined ? Boolean(sudanDyeFree) : true,
      });

      res.status(201).json(saved);
    } catch (error: any) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: error.message || 'Failed to save product' });
    }
  });

  // 3. Delete product from Cloud SQL
  app.delete('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteDbProduct(id);
      res.json({ success: true, deleted });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: error.message || 'Failed to delete product' });
    }
  });

  // 4. Toggle product stock status
  app.patch('/api/products/:id/stock', async (req, res) => {
    try {
      const { id } = req.params;
      const { inStock } = req.body;
      const updated = await toggleDbProductStock(id, Boolean(inStock));
      res.json(updated);
    } catch (error: any) {
      console.error('Error toggling product stock:', error);
      res.status(500).json({ error: error.message || 'Failed to toggle product stock' });
    }
  });

  // 5. Get sales records (weekly, monthly, yearly)
  app.get('/api/sales', async (req, res) => {
    try {
      const periodType = req.query.periodType as string | undefined;
      const records = await getDbSalesRecords(periodType);
      res.json(records);
    } catch (error: any) {
      console.error('Error fetching sales records:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch sales records' });
    }
  });

  // 6. Record sale
  app.post('/api/sales', async (req, res) => {
    try {
      const { periodType, periodLabel, litresSold, revenue, ordersCount } = req.body;
      const saved = await insertDbSalesRecord({
        periodType,
        periodLabel,
        litresSold: Number(litresSold),
        revenue: Number(revenue),
        ordersCount: Number(ordersCount),
      });
      res.status(201).json(saved);
    } catch (error: any) {
      console.error('Error creating sales record:', error);
      res.status(500).json({ error: error.message || 'Failed to save sales record' });
    }
  });

  // 7. Sync authenticated Firebase user into PostgreSQL users table
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: Missing user info' });
      }
      const user = await getOrCreateUser(
        req.user.uid,
        req.user.email || '',
        req.user.name || undefined
      );
      res.json(user);
    } catch (error: any) {
      console.error('Error syncing user:', error);
      res.status(500).json({ error: error.message || 'Failed to sync user' });
    }
  });

  // 8. List users
  app.get('/api/users', requireAuth, async (req: AuthRequest, res) => {
    try {
      const allUsers = await getUsers();
      res.json(allUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch users' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Drop Palm Oil Cloud SQL API', region: 'europe-west2' });
  });

  // Vite middleware in dev or static files in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
