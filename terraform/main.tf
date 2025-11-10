# terraform/main.tf
#
# Portfolio Infrastructure - Static Resources Root Configuration
#
# This deploys static resources (ECR, S3, IAM) that are shared across environments.
# Deploy once in the default workspace.
#
# Usage:
#   terraform init
#   terraform workspace select default
#   terraform apply

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket  = "terraform-state-bucket-mcbrumagin.com"
    key     = "static/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}

# Module: Static Shared Resources (ECR, S3)
module "static_shared" {
  source = "./static-shared"
  
  aws_region     = var.aws_region
  s3_bucket_name = var.s3_bucket_name
}

# Module: Static Environment Resources (IAM)
module "static_env" {
  source = "./static-env"
  
  aws_region = var.aws_region
  
  # Pass S3 bucket info from static_shared module
  s3_bucket_name = module.static_shared.s3_bucket_name
  s3_bucket_arn  = module.static_shared.s3_bucket_arn
}

# Outputs from both modules
output "portfolio_ecr_url" {
  description = "Portfolio ECR repository URL"
  value       = module.static_shared.portfolio_ecr_url
}

output "soundclone_ecr_url" {
  description = "SoundClone ECR repository URL"
  value       = module.static_shared.soundclone_ecr_url
}

output "soundclone_ffmpeg_ecr_url" {
  description = "SoundClone FFmpeg ECR repository URL"
  value       = module.static_shared.soundclone_ffmpeg_ecr_url
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = module.static_shared.s3_bucket_name
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = module.static_shared.s3_bucket_arn
}

output "runtime_role_arns" {
  description = "Runtime role ARNs for dev and prod"
  value       = module.static_env.runtime_role_arns
}

output "deployment_user_access_key_id" {
  description = "Access key ID for deployment user"
  value       = module.static_env.deployment_user_access_key_id
  sensitive   = true
}

output "deployment_user_secret_access_key" {
  description = "Secret access key for deployment user"
  value       = module.static_env.deployment_user_secret_access_key
  sensitive   = true
}
