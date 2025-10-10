#!/bin/bash
set -e

# User data script for EC2 instance initialization
# This script runs on first boot

exec > >(tee /var/log/user-data.log)
exec 2>&1

echo "Starting user data script..."

# Update system
dnf update -y

# Install Docker
dnf install -y docker

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group
usermod -a -G docker ec2-user

# Install Docker Compose
DOCKER_COMPOSE_VERSION="2.24.5"
curl -L "https://github.com/docker/compose/releases/download/v$${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create application directory
mkdir -p /home/ec2-user/portfolio
chown ec2-user:ec2-user /home/ec2-user/portfolio

# Create docker-compose.yml
cat > /home/ec2-user/portfolio/docker-compose.yml <<'EOF'
version: '3.8'

services:
  portfolio-app:
    image: YOUR_ECR_OR_DOCKERHUB_IMAGE:latest
    container_name: portfolio-app
    restart: unless-stopped
    networks:
      - portfolio-net
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  nginx:
    image: YOUR_ECR_OR_DOCKERHUB_NGINX_IMAGE:latest
    container_name: portfolio-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /home/ec2-user/letsencrypt:/etc/letsencrypt
      - /home/ec2-user/certbot:/var/www/certbot
    environment:
      - DOMAIN=${domain_name}
    depends_on:
      - portfolio-app
    networks:
      - portfolio-net
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

networks:
  portfolio-net:
    driver: bridge
EOF

# Create directories for SSL certificates
mkdir -p /home/ec2-user/letsencrypt
mkdir -p /home/ec2-user/certbot
chown -R ec2-user:ec2-user /home/ec2-user/letsencrypt
chown -R ec2-user:ec2-user /home/ec2-user/certbot

echo "User data script completed successfully!"

