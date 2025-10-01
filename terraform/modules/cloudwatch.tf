# terraform/cloudwatch.tf

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/${var.project_name}-${terraform.workspace}"
  retention_in_days = 30

  tags = {
    Name        = "${var.project_name}-${terraform.workspace}-logs"
    Environment = var.environment
  }
}
