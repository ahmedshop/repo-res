#!/bin/bash

# Copy .env.example to .env if it doesn't already exist
if [ ! -f .env ]; then
  echo "Copying .env.example to .env..."
  cp .env.example .env
fi

# Bring up the Docker containers in detached mode
echo "Starting Docker containers..."
docker compose up -d

# Install dependencies and generate the application key
echo "Installing dependencies and generating application key..."
make install-dep && make generate-key

# Run database migrations
echo "Running database migrations..."
make migrate

echo "Setup completed successfully."
