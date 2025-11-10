# terraform/static-shared/main.tf
# Static shared resources - ECR repositories, S3 buckets
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

