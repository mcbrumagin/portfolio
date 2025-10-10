#!/bin/bash
set -e

echo "$(date): Checking for certificate renewal..."

# Attempt to renew certificates
certbot renew --quiet --no-self-upgrade

# Reload nginx if certificates were renewed
if [ $? -eq 0 ]; then
    echo "$(date): Certificates checked/renewed successfully"
    nginx -s reload
    echo "$(date): Nginx reloaded"
else
    echo "$(date): Certificate renewal check failed"
fi

