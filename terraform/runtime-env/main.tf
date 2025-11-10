# terraform/runtime-env/main.tf
# Environment-specific runtime resources - ECS clusters, services, target groups
# Deploy in dev and prod workspaces

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
    key     = "runtime-env/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}

# Reference static resources (combines static-shared and static-env)
data "terraform_remote_state" "static" {
  backend = "s3"
  
  config = {
    bucket = "terraform-state-bucket-mcbrumagin.com"
    key    = "static/terraform.tfstate"
    region = "us-east-1"
  }
}

# Reference runtime-shared resources
data "terraform_remote_state" "runtime_shared" {
  backend = "s3"
  
  config = {
    bucket = "terraform-state-bucket-mcbrumagin.com"
    key    = "runtime-shared/terraform.tfstate"
    region = "us-east-1"
  }
  
  workspace = "shared"
}

# Local values for easier access
locals {
  # From static module (combines static-shared and static-env)
  portfolio_ecr_url         = data.terraform_remote_state.static.outputs.portfolio_ecr_url
  soundclone_ecr_url        = data.terraform_remote_state.static.outputs.soundclone_ecr_url
  soundclone_ffmpeg_ecr_url = data.terraform_remote_state.static.outputs.soundclone_ffmpeg_ecr_url
  s3_bucket_name            = data.terraform_remote_state.static.outputs.s3_bucket_name
  runtime_role_arn          = data.terraform_remote_state.static.outputs.runtime_role_arns[terraform.workspace]
  
  # From runtime-shared
  alb_arn                 = data.terraform_remote_state.runtime_shared.outputs.alb_arn
  alb_listener_arn        = data.terraform_remote_state.runtime_shared.outputs.alb_listener_arn
  vpc_id                  = data.terraform_remote_state.runtime_shared.outputs.vpc_id
  subnet_ids              = data.terraform_remote_state.runtime_shared.outputs.subnet_ids
  ecs_security_group_id   = data.terraform_remote_state.runtime_shared.outputs.ecs_security_group_id
  
  # Image tags based on environment
  image_tag = terraform.workspace == "prod" ? "latest" : "dev-latest"
}

