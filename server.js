import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './models/schema.js';

// Import routes
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
initializeDatabase();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running ✅' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Order Management System Backend',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      customers: '/api/customers',
      orders: '/api/orders',
      dashboard: '/api/dashboard/stats'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Order Management System Backend      ║
║              Running on                ║
║    http://localhost:${PORT}             ║
╚════════════════════════════════════════╝
  `);
});
