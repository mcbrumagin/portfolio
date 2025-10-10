# terraform/ecr.tf

# Local value to reference ECR repository consistently
locals {
  ecr_repository_url = terraform.workspace == "default" ? aws_ecr_repository.app[0].repository_url : data.aws_ecr_repository.app[0].repository_url
}

# ECR Repository - only create in default workspace, reference in others
resource "aws_ecr_repository" "app" {
  count = terraform.workspace == "default" ? 1 : 0 # only default
  name = "${var.project_name}-app"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "${var.project_name}-ecr"
    Environment = "default"
  }
}

# Data source to reference existing ECR repository in non-default workspaces
data "aws_ecr_repository" "app" {
  count = terraform.workspace != "default" ? 1 : 0
  name  = "${var.project_name}-app"
}
