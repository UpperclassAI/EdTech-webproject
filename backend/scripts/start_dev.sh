#!/bin/bash

echo "Starting Upperclass Platform in development mode..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "Please edit .env file with your settings"
    exit 1
fi

# Start Redis
echo "Starting Redis..."
redis-server --daemonize yes

# Apply migrations
echo "Applying migrations..."
python manage.py migrate

# Create superuser if doesn't exist
echo "Creating superuser..."
python manage.py createsuperuser --noinput --username admin --email admin@example.com || true

# Start Celery worker in background
echo "Starting Celery worker..."
celery -A config worker --loglevel=info --detach

# Start Celery beat in background
echo "Starting Celery beat..."
celery -A config beat --loglevel=info --detach

# Start Django development server
echo "Starting Django development server..."
python manage.py runserver