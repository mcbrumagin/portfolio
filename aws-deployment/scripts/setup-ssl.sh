#!/bin/bash
set -e

# SSL Setup Script
# Run this on the EC2 instance after deployment to obtain SSL certificate

if [ -z "$1" ]; then
    echo "Usage: $0 <domain>"
    echo "Example: $0 mcbrumagin.com"
    exit 1
fi

DOMAIN="$1"
EMAIL="${2:-admin@$DOMAIN}"

echo "=== SSL Certificate Setup ==="
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# Check if nginx is running
if ! docker ps | grep -q portfolio-nginx; then
    echo "Error: Nginx container is not running. Please deploy first."
    exit 1
fi

# Obtain certificate
echo "Obtaining SSL certificate from Let's Encrypt..."
docker exec portfolio-nginx certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"

if [ $? -eq 0 ]; then
    echo ""
    echo "Certificate obtained successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Update nginx/default.conf to uncomment the HTTPS server block"
    echo "2. Replace YOUR_DOMAIN with $DOMAIN in the configuration"
    echo "3. Restart nginx: docker-compose restart nginx"
    echo ""
    echo "The certificate renewal will happen automatically."
else
    echo "Error obtaining certificate. Please check:"
    echo "1. DNS is properly configured to point to this server"
    echo "2. Port 80 is accessible from the internet"
    echo "3. The domain name is correct"
    exit 1
fi

