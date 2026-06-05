import pool from '../config/database.js';

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id, 
        o.customer_id, 
        c.name as customer_name, 
        o.product_id, 
        p.name as product_name, 
        o.quantity, 
        o.total_amount, 
        o.status, 
        o.order_date,
        o.created_at
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN products p ON o.product_id = p.id
      ORDER BY o.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT 
        o.id, 
        o.customer_id, 
        c.name as customer_name, 
        o.product_id, 
        p.name as product_name, 
        o.quantity, 
        o.total_amount, 
        o.status, 
        o.order_date,
        o.created_at
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN products p ON o.product_id = p.id
      WHERE o.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};

// Create order
export const createOrder = async (req, res) => {
  try {
    const { customer_id, product_id, quantity, status = 'pending' } = req.body;

    if (!customer_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get product price
    const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [product_id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const price = productResult.rows[0].price;
    const total_amount = price * quantity;

    const result = await pool.query(
      'INSERT INTO orders (customer_id, product_id, quantity, total_amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [customer_id, product_id, quantity, total_amount, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};
