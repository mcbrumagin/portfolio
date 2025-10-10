#!/bin/bash
set -e

# Local testing script
# Test the deployment locally before pushing to EC2

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AWS_DEPLOYMENT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== Local Testing Script ==="
echo ""

# Check if .env exists
if [ ! -f "$AWS_DEPLOYMENT_DIR/.env" ]; then
    echo "Creating .env file from env.example..."
    cp "$AWS_DEPLOYMENT_DIR/env.example" "$AWS_DEPLOYMENT_DIR/.env"
    echo "DOMAIN=localhost" > "$AWS_DEPLOYMENT_DIR/.env"
fi

cd "$AWS_DEPLOYMENT_DIR"

# Build images
echo "Building images..."
docker-compose build

# Start services
echo "Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 10

# Check status
echo ""
echo "Container status:"
docker-compose ps

echo ""
echo "Testing endpoints..."
echo ""

# Test HTTP endpoint
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✓ Health check passed"
else
    echo "✗ Health check failed"
fi

echo ""
echo "Services are running!"
echo ""
echo "Access the application at: http://localhost"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"

