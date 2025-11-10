# terraform/cloudwatch.tf

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/portfolio-${terraform.workspace}"
  retention_in_days = 30

  tags = {
    Name        = "portfolio-${terraform.workspace}-logs"
    Environment = terraform.workspace
  }
}
