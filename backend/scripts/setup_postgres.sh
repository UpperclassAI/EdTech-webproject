#!/bin/bash

echo "Setting up PostgreSQL for Upperclass Platform..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Installing..."
    
    # Detect OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt update
        sudo apt install -y postgresql postgresql-contrib
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install postgresql
    else
        echo "Unsupported OS. Please install PostgreSQL manually."
        exit 1
    fi
fi

# Start PostgreSQL service
echo "Starting PostgreSQL service..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start postgresql
fi

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql <<EOF
CREATE DATABASE upperclass_db;
CREATE USER upperclass_user WITH PASSWORD 'upperclass_password';
ALTER ROLE upperclass_user SET client_encoding TO 'utf8';
ALTER ROLE upperclass_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE upperclass_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE upperclass_db TO upperclass_user;
\q
EOF

echo "PostgreSQL setup complete!"
echo "Database: upperclass_db"
echo "User: upperclass_user"
echo "Password: upperclass_password"