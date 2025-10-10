# Quick Start Guide

## For Local Testing (5 minutes)

```bash
cd aws-deployment

# Create environment file
cp env.example .env
echo "DOMAIN=localhost" > .env

# Test locally
./scripts/local-test.sh

# Access at http://localhost
# Stop with: docker-compose down
```

## For AWS Deployment (30 minutes)

### 1. Build & Push Images
```bash
# Login to Docker Hub
docker login

# Build and push
export DOCKER_NAMESPACE=your-dockerhub-username
./scripts/build-and-push.sh
```

### 2. Deploy Infrastructure
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
vim terraform.tfvars

terraform init
terraform apply
# Note the instance_public_ip output
```

### 3. Configure DNS
Point your domain A record to the Elastic IP from terraform output.

### 4. Update Docker Compose on EC2
```bash
# SSH to instance
ssh -i ~/.ssh/your-key.pem ec2-user@<instance_ip>

# Update docker-compose.yml with your image names
cd ~/portfolio
vim docker-compose.yml
# Replace YOUR_ECR_OR_DOCKERHUB_IMAGE with actual image names

# Start services
docker-compose up -d
```

### 5. Get SSL Certificate
```bash
# Wait for DNS to propagate (5-10 minutes)
# Then on EC2 instance:
cd ~
curl -O https://raw.githubusercontent.com/your-repo/main/aws-deployment/scripts/setup-ssl.sh
chmod +x setup-ssl.sh
./setup-ssl.sh your-domain.com
```

### 6. Enable HTTPS
```bash
# Copy and edit nginx config
docker cp portfolio-nginx:/etc/nginx/conf.d/default.conf ~/default.conf
vim ~/default.conf

# Uncomment HTTPS section, comment HTTP proxy
# Replace YOUR_DOMAIN with your actual domain

# Apply changes
docker cp ~/default.conf portfolio-nginx:/etc/nginx/conf.d/default.conf
docker-compose restart nginx
```

### 7. Test
```bash
curl https://your-domain.com/health
```

## Cost

- **EC2 t4g.micro**: $6.05/month
- **EBS 8GB**: $0.80/month  
- **Elastic IP**: $3.60/month
- **Total**: ~$10.45/month

**Savings vs current setup**: ~$25.55/month (71% reduction)

## Files Reference

- `README.md` - Complete documentation
- `docker-compose.yml` - Local testing compose file
- `portfolio/Dockerfile` - ARM64 Node.js app container
- `nginx/Dockerfile` - ARM64 Nginx with SSL container
- `terraform/main.tf` - Infrastructure definition
- `scripts/` - Deployment and management scripts

## Next Steps

See `README.md` for complete documentation including:
- SSL certificate management
- Monitoring and maintenance
- Security considerations
- Troubleshooting
- Cost optimization tips

