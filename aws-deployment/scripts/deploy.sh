#!/bin/bash
set -e

# Deployment script for portfolio on EC2
# This script should be run from the EC2 instance

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="/home/ec2-user/portfolio"

echo "=== Portfolio Deployment Script ==="
echo "Starting deployment..."

# Pull latest images
echo "Pulling latest Docker images..."
cd "$PROJECT_DIR"
docker-compose pull

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down

# Start new containers
echo "Starting containers..."
docker-compose up -d

# Check container health
echo "Waiting for containers to be healthy..."
sleep 10

# Check status
echo "Container status:"
docker-compose ps

echo ""
echo "Deployment complete!"
echo "Check logs with: docker-compose logs -f"

