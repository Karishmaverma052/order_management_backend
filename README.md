# Order Management System - Backend

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm

## Setup Instructions

### 1. Database Setup

Make sure PostgreSQL is running. Create the database:

```bash
psql -U pgadmin
```

```sql
CREATE DATABASE order_management_db;
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Environment Configuration

The `.env` file is already configured with:
- DB_USER: pgadmin
- DB_PASSWORD: mypgadmin
- DB_NAME: order_management_db
- DB_HOST: localhost
- DB_PORT: 5432
- PORT: 5000

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## Example Requests

### Create Product
```json
POST /api/products
{
  "name": "Laptop",
  "sku": "LP001",
  "price": 50000,
  "stock_quantity": 20
}
```

### Create Customer
```json
POST /api/customers
{
  "name": "Karishma Verma",
  "email": "karishma@gmail.com",
  "phone": "9876543210",
  "address": "123 Main St"
}
```

### Create Order
```json
POST /api/orders
{
  "customer_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

## Deployment

For production deployment, update the `.env` file with your production database credentials and use a process manager like PM2.
