-- PostgreSQL Setup Script for Order Management System
-- Run this in pgAdmin or psql command line

-- 1. First, connect as superuser (postgres)
-- In psql: psql -U postgres

-- 2. Create the pgadmin user (role)
CREATE ROLE pgadmin WITH LOGIN PASSWORD 'mypgadmin';

-- 3. Grant superuser privileges (optional, for development)
ALTER ROLE pgadmin SUPERUSER;

-- 4. Create the database
CREATE DATABASE order_management_db OWNER pgadmin;

-- 5. Grant privileges
GRANT ALL PRIVILEGES ON DATABASE order_management_db TO pgadmin;

-- Done! Now the backend can connect.
-- Connection string: postgresql://pgadmin:mypgadmin@localhost:5432/order_management_db
