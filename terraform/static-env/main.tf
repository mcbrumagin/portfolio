# terraform/static-env/main.tf
# Static environment-specific resources - IAM users/roles for dev and prod
# Called as a module from root main.tf

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

locals {
  # S3 bucket info passed from parent module
  s3_bucket_name = var.s3_bucket_name
  s3_bucket_arn  = var.s3_bucket_arn
  environments   = ["dev", "prod"]
}

