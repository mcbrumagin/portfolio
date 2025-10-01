# Deployment Guide | Terraform & Github Actions

## Architecture
- **2 t4g.nano EC2 instances** running multiple containers
- **Single ALB** routing by hostname to different environments
- **Branch-based deployments** with environment-specific Docker tags
- **Shared SSL certificate** covering all subdomains

## Prerequisites

### 1. Domain Setup
- Acquire your desired url with your domain registrar (if not already done)
- Create Route53 hosted zone in AWS
- Update nameservers in registrar to point to Route53

### 2. AWS Secrets
Configure aws secrets for terraform: `aws configure`

### 3. Fork this repository
- The deploy.yaml will handle docker build/push & ECS updates
- Pushing to dev branch deploys dev
- Pushing/merging to master deploys prod

## Infrastructure Organization

The Terraform configuration is organized using modules to keep things cleaner:

```
terraform/
├── main.tf              # Root configuration using the portfolio module
├── variables.tf         # Input variables
├── outputs.tf           # Output values
├── provider.tf          # AWS provider configuration
└── modules/             # Reusable infrastructure
      ├── main.tf            # Module documentation
      ├── variables.tf       # Module input variables
      ├── outputs.tf         # Module outputs
      ├── networking.tf      # VPC, subnets, security groups
      ├── ecr.tf             # ECR repository
      ├── load-balancer.tf   # ALB, target groups, listeners
      ├── ssl.tf             # SSL certificates
      ├── ecs.tf             # ECS cluster, services, IAM
      ├── cloudwatch.tf      # CloudWatch log groups
      └── route53.tf         # DNS records and Route53 configuration
```

## Workspaces (Environments)

```
Workspaces:
├── default (unused)
├── dev     → Creates portfolio-dev-* resources
└── prod    → Creates portfolio-prod-* resources
```

## Deployment Steps

### Step 1: Configure Infrastructure

Copy `terraform.tfvars.example` as `terraform.tfvars` and update for your environment:
```bash
aws_region = "us-east-1"
project_name = "portfolio"
environment  = "dev" # or "prod"
domain_name = "<YOUR DOMAIN>"
enable_ssl = true
```

### Step 2: Deploy Infrastructure

```bash
cd terraform
terraform init
terraform plan --out dev.tfplan # or whatever env
terraform apply
```

This creates:
- VPC, subnets, security groups
- ECS cluster with EC2 capacity provider
- Application Load Balancer with SSL
- Route53 records and certificate validation
- ECR repository

### Step 3: Github Container Deployment
After infrastructure is ready, push to github dev branch (or master) to deploy containers:

```bash
# Deploy dev environment
git checkout dev
git push origin dev

# Deploy production environment
git checkout master
git push origin master
```

### Step 3: DNS Verification
After deployment, verify the domains work:
- `https://dev.mcbrumagin.com` - Dev environment
- `https://mcbrumagin.com` - Production environment
- `https://www.mcbrumagin.com` - Production (www)

## Environment Details

### Resource Allocation
- **Dev**: 1 containers, 256 CPU, 256 MB RAM each
- **Prod**: 2 containers, 256 CPU, 256 MB RAM each
- **Total**: 3 containers across 3 t4g.nano instances

### Health Checks
All environments use the `/health` endpoint which returns:
```json
{
  "health": "OK",
  "registryMap": { ... }
}
```

### Container Environment Variables
- **Dev containers**: `NODE_ENV=development`, `ENVIRONMENT=dev`
- **Prod containers**: `NODE_ENV=production`, `ENVIRONMENT=prod`

## Cost Optimization Features

1. **Shared Infrastructure**: All environments share the same EC2 instances
2. **ARM-based instances**: t4g.nano uses AWS Graviton2 processors (cheaper)
3. **Dynamic port allocation**: No port conflicts, efficient resource usage
4. **Single SSL certificate**: One cert covers all subdomains
5. **Minimal instance count**: Only 2 instances for all environments

## Troubleshooting

### Check ECS Service Status
```bash
aws ecs describe-services --cluster portfolio-cluster --services portfolio-dev-service portfolio-prod-service
```

### Check Container Logs
```bash
aws logs describe-log-groups --log-group-name-prefix "/ecs/portfolio"
aws logs tail /ecs/portfolio-dev --follow
```

### Check ALB Target Health
```bash
aws elbv2 describe-target-health --target-group-arn <target-group-arn>
```

### Force New Deployment
```bash
aws ecs update-service --cluster portfolio-cluster --service portfolio-dev-service --force-new-deployment
```

## Scaling

### Horizontal Scaling (More Containers)
Update desired count in `shared.tf`:
```hcl
desired_count = 3  # Increase from 2
```

### Vertical Scaling (More Resources)
Update instance type in `ec2.tf`:
```hcl
instance_type = "t4g.small"  # Upgrade from nano
```

### Add More Instances
Update Auto Scaling Group in `ec2.tf`:
```hcl
min_size         = 3  # Increase from 2
max_size         = 6  # Increase from 4
desired_capacity = 3  # Increase from 2
```

## Monitoring

- **CloudWatch Logs**: `/ecs/portfolio-{env}` log groups
- **ALB Metrics**: Request count, latency, error rates
- **ECS Metrics**: CPU/memory utilization per service
- **Target Group Health**: Health check status per environment
