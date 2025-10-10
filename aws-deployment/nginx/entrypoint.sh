#!/bin/bash
set -e

echo "Starting Nginx with SSL support..."

# Check if running on EC2 and if SSL certificates exist
if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
    echo "SSL certificates found for ${DOMAIN}"
else
    echo "No SSL certificates found. Running in HTTP-only mode."
    echo "To obtain SSL certificate, run: certbot certonly --webroot -w /var/www/certbot -d ${DOMAIN}"
fi

# Setup certbot renewal cron (runs twice daily)
if [ -n "${DOMAIN}" ]; then
    echo "0 */12 * * * /usr/local/bin/certbot-renew.sh >> /var/log/certbot-renew.log 2>&1" | crontab -
    crond
    echo "Certbot renewal cron job configured"
fi

# Start nginx
exec "$@"

