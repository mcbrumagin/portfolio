# ARM64 Nginx with SSL and ModSecurity support
FROM --platform=linux/arm64 nginx:alpine

# Install certbot and dependencies
RUN apk add --no-cache \
    certbot \
    certbot-nginx \
    openssl \
    bash \
    curl

# Create directories for SSL certificates and configs
RUN mkdir -p /etc/letsencrypt /var/www/certbot /etc/nginx/conf.d

# Copy nginx configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ssl-params.conf /etc/nginx/snippets/ssl-params.conf

# Copy certbot renewal script
COPY certbot-renew.sh /usr/local/bin/certbot-renew.sh
RUN chmod +x /usr/local/bin/certbot-renew.sh

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

EXPOSE 80 443

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

