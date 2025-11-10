# terraform/runtime-shared/main.tf
# Shared runtime resources - ALB, VPC, networking, certificates
# Deploy once in "shared" workspace

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
    key     = "runtime-shared/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}

