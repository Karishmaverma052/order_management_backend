import pool from '../config/database.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await pool.query('SELECT COUNT(*) FROM products');
    const totalCustomers = await pool.query('SELECT COUNT(*) FROM customers');
    const totalOrders = await pool.query('SELECT COUNT(*) FROM orders');
    const lowStockProducts = await pool.query('SELECT COUNT(*) FROM products WHERE stock_quantity < 20');

    const totalRevenue = await pool.query('SELECT SUM(total_amount) FROM orders WHERE status = \'completed\'');

    res.json({
      totalProducts: parseInt(totalProducts.rows[0].count),
      totalCustomers: parseInt(totalCustomers.rows[0].count),
      totalOrders: parseInt(totalOrders.rows[0].count),
      lowStockProducts: parseInt(lowStockProducts.rows[0].count),
      totalRevenue: totalRevenue.rows[0].sum || 0
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
};
