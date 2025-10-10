# Data source to reference existing ECR repository in non-default workspaces
data "aws_ecr_repository" "app" {
  count = terraform.workspace != "default" ? 1 : 0
  name  = "${var.project_name}-app"
}
