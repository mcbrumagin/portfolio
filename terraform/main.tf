# terraform/main.tf
#
# Portfolio Infrastructure - Root Configuration
#
# This configuration uses a local module to organize all infrastructure components.
# The module approach provides better organization, reusability, and separation of concerns.
# The application is configured to use S3 for remote state storage.

terraform {
  backend "s3" {
    bucket  = "terraform-state-bucket-mcbrumagin.com"
    key     = "portfolio/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

module "portfolio" {
  count = terraform.workspace != "default" ? 1 : 0 # prevent default
  source = "./modules"

  # Pass variables to the module
  project_name = var.project_name
  environment  = var.environment
  aws_region   = var.aws_region
  domain_name  = var.domain_name
  enable_ssl   = var.enable_ssl
}
