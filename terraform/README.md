# Portfolio Infrastructure - Modular Architecture

Cost-optimized Terraform infrastructure with shared ALB across dev/prod environments.

## 📁 Structure

```
terraform/
├── main.tf             # Root config - deploys static resources
├── static-shared/      # Module: ECR, S3
├── static-env/         # Module: IAM roles/users
├── runtime-shared/     # Shared ALB, VPC - workspace: shared
└── runtime-env/        # ECS per environment - workspaces: dev, prod
```

## 🚀 Quick Start

### Initial Setup (Run Once)

```bash
# 1. Static resources (from root)
terraform init
terraform workspace select default
terraform apply

# Get deployment credentials
terraform output -raw deployment_user_access_key_id
terraform output -raw deployment_user_secret_access_key
# → Add these to GitHub Secrets

# 2. Shared runtime
cd runtime-shared
terraform init
terraform workspace new shared
terraform apply
```

### Deploy Dev Environment

```bash
cd ../runtime-env
terraform init
terraform workspace new dev
terraform apply -var-file=terraform-dev.tfvars
```

### Deploy Prod Environment

```bash
terraform workspace new prod
terraform apply -var-file=terraform-prod.tfvars
```

## 📝 Module Details

### Root (default workspace)
- **Resources**: Combines static-shared and static-env modules
- **Cost**: $0 (S3 storage billed separately)
- **Deploy**: Once from terraform root
- **Files**: `main.tf` calls `static-shared/` and `static-env/` modules

#### static-shared (module)
- ECR repos, S3 bucket
- **Files**: `ecr.tf`, `s3-bucket.tf`

#### static-env (module)
- IAM users/roles for dev+prod
- **Files**: `iam-runtime.tf`, `iam-deployment.tf`

### runtime-shared (shared workspace)
- **Resources**: ALB, VPC, subnets, security groups, certificates
- **Cost**: ~$16/month
- **Deploy**: Once
- **Files**: `load-balancer.tf`, `networking.tf`, `ssl.tf`, `route53.tf`

### runtime-env (dev/prod workspaces)
- **Resources**: ECS cluster, service, target groups, secrets
- **Cost**: ~$10/month per environment
- **Deploy**: Once per environment
- **Files**: `ecs.tf`, `target-groups.tf`, `secrets.tf`

## 🔗 How Resources Connect

```
runtime-env (dev/prod)
    ↓ references via remote state
runtime-shared (ALB, VPC)
    ↓ references via remote state  
root main.tf (static resources)
    ├── static-shared module (ECR, S3)
    └── static-env module (IAM)
```

## 💰 Cost Breakdown

| Resource | Cost/Month | Notes |
|----------|------------|-------|
| Shared ALB | ~$16 | One ALB for both environments |
| ECS Dev | ~$10 | Fargate tasks |
| ECS Prod | ~$10 | Fargate tasks |
| Data Transfer | ~$2-5 | Variable |
| **Total** | **~$38/month** | **Was $54/month with separate ALBs** |

**Annual Savings: ~$192**

## 🌐 Domains

All domains point to the same shared ALB:
- **Dev Portfolio**: https://dev.mcbrumagin.com
- **Prod Portfolio**: https://mcbrumagin.com, https://www.mcbrumagin.com
- **Dev SoundClone**: https://dev.soundcl.one
- **Prod SoundClone**: https://soundcl.one, https://www.soundcl.one

## 📦 Workspaces

| Workspace | Location | Purpose |
|-----------|----------|---------|
| `default` | terraform/ (root) | Static resources via modules |
| `shared` | runtime-shared/ | Shared ALB/networking |
| `dev` | runtime-env/ | Dev ECS cluster |
| `prod` | runtime-env/ | Prod ECS cluster |

## 🔐 Secrets Management

Secrets are stored in AWS Secrets Manager:
- `portfolio/dev/soundclone/admin` - Dev admin credentials
- `portfolio/prod/soundclone/admin` - Prod admin credentials

Update via:
```bash
aws secretsmanager update-secret \
  --secret-id "portfolio/dev/soundclone/admin" \
  --secret-string '{"admin_user":"user","admin_secret":"pass"}'
```

## 🛠️ Common Operations

### Update a Specific Environment

```bash
cd runtime-env
terraform workspace select dev  # or prod
terraform plan
terraform apply
```

### Add/Update Listener Rules

Edit `runtime-env/target-groups.tf`, then:
```bash
terraform workspace select dev
terraform apply
```

### View Remote State

```bash
# From runtime-env
terraform console
> data.terraform_remote_state.runtime_shared.outputs.alb_arn
```

### Destroy an Environment

```bash
# Destroy in reverse order
cd runtime-env && terraform workspace select dev && terraform destroy
cd ../runtime-shared && terraform workspace select shared && terraform destroy  
cd .. && terraform workspace select default && terraform destroy
```

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: Step-by-step deployment
- **Each module**: See individual `main.tf` for details

## 🐛 Troubleshooting

### "No state file" error
You need to run `terraform init` in each module directory.

### Certificate validation stuck
Wait 5-10 minutes for DNS propagation. Check Route53 records exist.

### ECS tasks unhealthy
1. Check security groups allow ALB → ECS traffic
2. Verify `/health` endpoints return 200
3. Check CloudWatch logs: `/ecs/portfolio-{workspace}`

### 404 from ALB
1. Verify listener rules exist in runtime-env
2. Check target group health
3. Verify domain matches host header in listener rule

## 📞 Support

See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting and migration steps.
