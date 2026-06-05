# PostgreSQL Setup Guide

## Step 1: Install PostgreSQL (if not already installed)

### Windows
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` superuser
4. Default port is 5432

### macOS
```bash
brew install postgresql
brew services start postgresql
```

### Linux
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Step 2: Create pgadmin user and database

### Option A: Using pgAdmin GUI
1. Open pgAdmin (comes with PostgreSQL)
2. Connect to the server
3. Right-click on "Login/Group Roles" → Create → Login/Group Role
4. Name: `pgadmin`
5. Password: `mypgadmin`
6. Privileges tab: Check "Superuser"
7. Click Save
8. Right-click on Databases → Create → Database
9. Name: `order_management_db`
10. Owner: `pgadmin`
11. Click Save

### Option B: Using Command Line (psql)

```bash
# Connect as postgres user (will prompt for password)
psql -U postgres

# In psql, run these commands:
CREATE ROLE pgadmin WITH LOGIN PASSWORD 'mypgadmin';
ALTER ROLE pgadmin SUPERUSER;
CREATE DATABASE order_management_db OWNER pgadmin;
GRANT ALL PRIVILEGES ON DATABASE order_management_db TO pgadmin;

# Exit psql
\q
```

### Option C: Using SQL File
```bash
# Navigate to backend folder
cd backend

# Connect as postgres and run setup script
psql -U postgres -f setup_database.sql
```

## Step 3: Verify Connection

```bash
# Try connecting with pgadmin credentials
psql -U pgadmin -d order_management_db -h localhost
```

If successful, you'll see the psql prompt: `order_management_db=>`

## Step 4: Start the Backend

```bash
# Make sure PostgreSQL is running, then:
cd backend
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Order Management System Backend      ║
║              Running on                ║
║    http://localhost:5000             ║
╚════════════════════════════════════════╝

✅ Database tables initialized successfully!
```

## Troubleshooting

### "password authentication failed"
- Make sure pgadmin user exists with password "mypgadmin"
- Check .env file has correct credentials

### "FATAL: database 'order_management_db' does not exist"
- Create the database using steps above

### Port 5432 already in use
- Check if PostgreSQL is running twice
- Or change DB_PORT in .env to a different port

### Can't connect to localhost
- Make sure PostgreSQL service is running
- Windows: Services → PostgreSQL database service
- macOS: `brew services list` to check status
- Linux: `sudo systemctl status postgresql`
