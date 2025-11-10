# terraform/ecr.tf

# Local value to reference ECR repository consistently
locals {
  ecr_repository_url = terraform.workspace == "default" ? aws_ecr_repository.app[0].repository_url : data.aws_ecr_repository.app[0].repository_url
}

# ECR Repository - only create in default workspace, reference in others
resource "aws_ecr_repository" "app" {
  count = terraform.workspace == "default" ? 1 : 0 # only default
  name = "portfolio-app"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "portfolio-ecr"
    Environment = "default"
  }
}

resource "aws_ecr_repository" "soundclone-app" {
  count = terraform.workspace == "default" ? 1 : 0
  name = "soundclone-app"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "soundclone-ecr"
    Environment = "default"
  }
}

resource "aws_ecr_repository" "soundclone-ffmpeg" {
  count = terraform.workspace == "default" ? 1 : 0
  name = "soundclone-ffmpeg"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "soundclone-ffmpeg-ecr"
    Environment = "default"
  }
}

# Data source to reference existing ECR repository in non-default workspaces
data "aws_ecr_repository" "app" {
  count = terraform.workspace != "default" ? 1 : 0
  name  = "portfolio-app"
}

data "aws_ecr_repository" "soundclone-app" {
  count = terraform.workspace != "default" ? 1 : 0
  name  = "soundclone-app"
}

data "aws_ecr_repository" "soundclone-ffmpeg" {
  count = terraform.workspace != "default" ? 1 : 0
  name  = "soundclone-ffmpeg"
}
