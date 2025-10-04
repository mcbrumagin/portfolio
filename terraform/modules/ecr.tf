# terraform/ecr.tf

# Local value to reference ECR repository consistently
locals {
  ecr_repository_url = terraform.workspace == "dev" ? aws_ecr_repository.app[0].repository_url : data.aws_ecr_repository.app[0].repository_url
}

# ECR Repository - only create in dev workspace, reference in others
resource "aws_ecr_repository" "app" {
  count = terraform.workspace == "dev" ? 1 : 0
  name = "${var.project_name}-app"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "${var.project_name}-ecr"
    Environment = "dev"
  }
}

# Data source to reference existing ECR repository in non-dev workspaces
data "aws_ecr_repository" "app" {
  count = terraform.workspace != "dev" ? 1 : 0
  name  = "${var.project_name}-app"
}
