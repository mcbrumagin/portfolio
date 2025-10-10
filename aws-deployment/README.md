# Portfolio EC2 Deployment

This directory contains the infrastructure and configuration for deploying the portfolio application on a plain EC2 t4g.micro instance with ARM64 Docker containers.

## Architecture

- **EC2 Instance**: t4g.micro (ARM64) running Amazon Linux 2023
- **Containers**:
  - Portfolio application (Node.js on Alpine Linux)
  - Nginx reverse proxy with SSL termination
- **SSL**: Let's Encrypt via certbot
- **Networking**: Single VPC with public subnet, Elastic IP

## Cost Estimate

- **EC2 t4g.micro**: ~$6.05/month (on-demand)
- **EBS 8GB gp3**: ~$0.80/month
- **Elastic IP**: ~$3.60/month
- **Total**: ~$10.45/month (vs ~$36/month with ALB + Fargate)

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **SSH Key Pair** created in AWS EC2
3. **Domain Name** with DNS access
4. **Docker** installed locally (for building images)
5. **Terraform** >= 1.0 installed

## Directory Structure

```
aws-deployment/
├── portfolio/              # Portfolio app Docker build
│   ├── Dockerfile         # ARM64 Node.js container
│   ├── build.sh           # Build script
│   └── .dockerignore
├── nginx/                 # Nginx reverse proxy
│   ├── Dockerfile         # ARM64 Nginx with certbot
│   ├── nginx.conf         # Main nginx config
│   ├── default.conf       # Site configuration
│   ├── ssl-params.conf    # SSL security settings
│   ├── entrypoint.sh      # Container startup script
│   ├── certbot-renew.sh   # Auto-renewal script
│   └── build.sh           # Build script
├── terraform/             # Infrastructure as Code
│   ├── main.tf            # EC2, VPC, networking
│   ├── variables.tf       # Input variables
│   ├── outputs.tf         # Output values
│   ├── user-data.sh       # EC2 initialization script
│   └── terraform.tfvars.example
├── scripts/               # Deployment and setup scripts
│   ├── build-and-push.sh  # Build and push images
│   ├── deploy.sh          # Deploy on EC2
│   ├── setup-ssl.sh       # Obtain SSL certificate
│   └── local-test.sh      # Test locally
├── docker-compose.yml     # Local testing
└── env.example            # Environment variables
```

## Deployment Guide

### Step 1: Build Docker Images

First, build the ARM64 Docker images:

```bash
# Build portfolio app
cd aws-deployment/portfolio
./build.sh

# Build nginx
cd ../nginx
./build.sh

# Test locally (optional)
cd ..
cp env.example .env
./scripts/local-test.sh
```

### Step 2: Push Images to Registry

You'll need to push images to a container registry (Docker Hub, ECR, etc.):

#### Option A: Docker Hub

```bash
# Login
docker login

# Set environment variables
export DOCKER_REGISTRY=docker.io
export DOCKER_NAMESPACE=your-username
export TAG=latest

# Build and push
./scripts/build-and-push.sh
```

#### Option B: AWS ECR

```bash
# Create ECR repositories
aws ecr create-repository --repository-name portfolio-app --region us-east-1
aws ecr create-repository --repository-name portfolio-nginx --region us-east-1

# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Build and push
export DOCKER_REGISTRY=YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
export DOCKER_NAMESPACE=""
./scripts/build-and-push.sh
```

### Step 3: Configure Terraform

```bash
cd terraform

# Copy example variables
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
vim terraform.tfvars
```

Required variables:
```hcl
aws_region      = "us-east-1"
project_name    = "portfolio-ec2"
environment     = "dev"
domain_name     = "mcbrumagin.com"
key_name        = "your-ssh-key-name"
allowed_ssh_cidr = ["YOUR_IP/32"]  # Your IP for SSH access
```

### Step 4: Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Deploy
terraform apply
```

Save the outputs:
- `instance_public_ip` - You'll need this for DNS
- `ssh_connection` - Command to SSH into the instance

### Step 5: Configure DNS

Point your domain to the Elastic IP:

```
Type: A
Name: @ (or subdomain)
Value: <instance_public_ip from terraform output>
TTL: 300
```

Wait for DNS propagation (check with `dig mcbrumagin.com`).

### Step 6: Update EC2 Docker Compose

SSH into the instance:

```bash
ssh -i ~/.ssh/your-key.pem ec2-user@<instance_public_ip>
```

Update the docker-compose.yml with your image names:

```bash
cd ~/portfolio
vim docker-compose.yml
```

Replace `YOUR_ECR_OR_DOCKERHUB_IMAGE` with your actual image names:
```yaml
services:
  portfolio-app:
    image: your-username/portfolio-app:latest
    # ... rest of config

  nginx:
    image: your-username/portfolio-nginx:latest
    # ... rest of config
```

### Step 7: Deploy Application

Pull and start the containers:

```bash
cd ~/portfolio
docker-compose pull
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

Test HTTP access: `http://your-domain.com/health`

### Step 8: Obtain SSL Certificate

**Important**: Wait until DNS is fully propagated and your domain points to the EC2 instance!

On the EC2 instance:

```bash
# Download the setup-ssl script (or copy from your repo)
wget https://raw.githubusercontent.com/your-repo/aws-deployment/scripts/setup-ssl.sh
chmod +x setup-ssl.sh

# Run the SSL setup
./setup-ssl.sh mcbrumagin.com admin@mcbrumagin.com
```

This will:
1. Request a certificate from Let's Encrypt
2. Store it in `/home/ec2-user/letsencrypt`
3. Set up automatic renewal

### Step 9: Enable HTTPS

After obtaining the certificate, enable HTTPS in nginx:

```bash
# Copy the nginx config locally to edit
docker cp portfolio-nginx:/etc/nginx/conf.d/default.conf ~/default.conf

# Edit the file
vim ~/default.conf
```

Make these changes:

1. **Uncomment the HTTP redirect** (lines ~26-28):
```nginx
location / {
    return 301 https://$host$request_uri;
}
```

2. **Comment out the temporary proxy** (lines ~31-50)

3. **Uncomment the HTTPS server block** (lines ~55-end)

4. **Replace `YOUR_DOMAIN`** with your actual domain (appears twice)

5. **Optional: Adjust bot filtering** in the HTTPS location block to your needs

Copy the updated config back and restart:

```bash
docker cp ~/default.conf portfolio-nginx:/etc/nginx/conf.d/default.conf
docker-compose restart nginx
```

### Step 10: Verify Deployment

Test your deployment:

```bash
# HTTP should redirect to HTTPS
curl -I http://mcbrumagin.com

# HTTPS should work
curl https://mcbrumagin.com/health

# Check SSL certificate
openssl s_client -connect mcbrumagin.com:443 -servername mcbrumagin.com < /dev/null
```

## SSL Certificate Management

### Certificate Renewal

Certificates are automatically renewed by a cron job that runs twice daily. The certbot-renew.sh script:
- Checks if renewal is needed (Let's Encrypt certs last 90 days)
- Renews if expiry is within 30 days
- Reloads nginx if renewed

### Manual Renewal

If needed, manually renew:

```bash
docker exec portfolio-nginx certbot renew
docker-compose restart nginx
```

### Check Certificate Expiry

```bash
docker exec portfolio-nginx certbot certificates
```

## Monitoring and Maintenance

### View Logs

```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f nginx
docker-compose logs -f portfolio-app
```

### Container Status

```bash
docker-compose ps
docker stats
```

### Update Deployment

```bash
# Pull latest images
docker-compose pull

# Restart with new images
docker-compose up -d

# Or use the deploy script
./scripts/deploy.sh
```

### SSH Access

```bash
# Use the output from terraform
terraform output ssh_connection

# Or manually
ssh -i ~/.ssh/your-key.pem ec2-user@<elastic-ip>
```

## Security Considerations

1. **SSH Access**: Limit `allowed_ssh_cidr` to your IP only
2. **Firewall**: Security group restricts access to 80, 443, and 22
3. **SSL**: Modern TLS 1.2+ with strong cipher suites
4. **Rate Limiting**: Nginx configured with request rate limits
5. **Bot Filtering**: Basic user-agent filtering (can be enhanced)
6. **Updates**: Regularly update the base images and packages

## Bot Filtering

Basic bot filtering is enabled in the HTTPS server block. To customize:

```nginx
# Block specific user agents
if ($http_user_agent ~* (bot|crawler|spider)) {
    return 403;
}

# Whitelist good bots (Google, etc.)
if ($http_user_agent ~* (googlebot|bingbot)) {
    set $block_bot 0;
}
```

For advanced protection, consider:
- AWS WAF (adds cost)
- CloudFlare (free tier available)
- fail2ban on the EC2 instance

## ModSecurity (Future Enhancement)

The current setup doesn't include ModSecurity to keep things simple. To add it:

1. Use `nginx:alpine` with ModSecurity compiled in, or
2. Install ModSecurity as a separate module
3. Add OWASP Core Rule Set (CRS)

This would provide WAF-like protection but adds complexity and some performance overhead.

## Troubleshooting

### DNS Not Resolving

```bash
# Check DNS propagation
dig mcbrumagin.com
nslookup mcbrumagin.com

# Verify A record points to Elastic IP
dig +short mcbrumagin.com
```

### SSL Certificate Fails

Common causes:
- DNS not propagated yet (wait 5-10 minutes)
- Port 80 not accessible (check security group)
- Domain ownership verification failed
- Rate limit hit (Let's Encrypt has limits)

Check logs:
```bash
docker exec portfolio-nginx cat /var/log/letsencrypt/letsencrypt.log
```

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Check specific container
docker logs portfolio-app
docker logs portfolio-nginx

# Inspect container
docker inspect portfolio-nginx
```

### ARM64 Compatibility Issues

If you encounter "exec format error":
- Ensure you're building with `--platform linux/arm64`
- Verify EC2 instance is ARM64 (t4g family)
- Check base images support ARM64

## Cleanup

To destroy all infrastructure:

```bash
cd terraform
terraform destroy
```

**Warning**: This will delete:
- EC2 instance
- Elastic IP
- VPC and networking
- All data on the instance

## Cost Optimization

Current setup: ~$10.45/month

Further savings:
- **Spot Instance**: Save ~70% but risk interruption
- **t4g.nano**: $3.02/month if sufficient (512MB RAM)
- **Reserved Instance**: 1-year commitment saves ~30%

## Migration from Existing Infrastructure

To migrate from the current ALB + Fargate setup:

1. Deploy this infrastructure in parallel
2. Test thoroughly with DNS pointed at new IP
3. Switch DNS to new Elastic IP
4. Monitor for issues
5. After 24-48 hours, destroy old infrastructure

## Future Enhancements

Potential improvements:
- [ ] Auto-scaling with multiple instances + NLB
- [ ] ECS on EC2 for easier container management
- [ ] CloudWatch monitoring and alarms
- [ ] Automated backups of SSL certificates
- [ ] ModSecurity WAF integration
- [ ] Service discovery/registry for microservices
- [ ] Blue-green deployments

## Support

For issues or questions:
- Check logs first: `docker-compose logs`
- Review this README thoroughly
- Check AWS CloudWatch logs
- Verify DNS configuration
- Ensure security groups allow traffic

## License

Same as parent project.

