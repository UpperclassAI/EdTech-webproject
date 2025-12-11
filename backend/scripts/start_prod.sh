#!/bin/bash

echo "Starting Upperclass Platform in production mode..."

# Load environment variables
source .env

# Check if all required environment variables are set
required_vars=("SECRET_KEY" "DB_ENGINE" "DB_NAME" "OPENAI_API_KEY")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: $var is not set in .env file"
        exit 1
    fi
done

# Collect static files
python manage.py collectstatic --noinput

# Apply migrations
python manage.py migrate

# Start Gunicorn
echo "Starting Gunicorn..."
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120 --access-logfile - --error-logfile - &

# Start Celery worker
echo "Starting Celery worker..."
celery -A config worker --loglevel=info --concurrency=4 &

# Start Celery beat
echo "Starting Celery beat..."
celery -A config beat --loglevel=info &

# Wait for all processes
wait