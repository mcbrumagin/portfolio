# terraform/static-env/iam-deployment.tf
# Deployment IAM user for CI/CD (GitHub Actions)
# Single deployment user can deploy to both dev and prod

# Deployment IAM User (for GitHub Actions)
resource "aws_iam_user" "deployment_user" {
  name = "portfolio-deployment-user"
  path = "/deployment/"
  
  tags = {
    Name        = "portfolio-deployment-user"
    Environment = "shared"
    Purpose     = "CI/CD Deployment"
  }
}

# Access key for deployment user (will be stored in GitHub secrets)
resource "aws_iam_access_key" "deployment_user_key" {
  user = aws_iam_user.deployment_user.name
}

# ECR Policy for deployment user
resource "aws_iam_policy" "deployment_ecr_policy" {
  name        = "portfolio-deployment-ecr-policy"
  description = "ECR access policy for deployment user"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:PutImage"
        ]
        Resource = "*"
      }
    ]
  })
}

# ECS Policy for deployment user (can deploy to both dev and prod)
resource "aws_iam_policy" "deployment_ecs_policy" {
  name        = "portfolio-deployment-ecs-policy"
  description = "ECS access policy for deployment user"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecs:UpdateService",
          "ecs:DescribeServices",
          "ecs:DescribeTasks",
          "ecs:DescribeTaskDefinition",
          "ecs:RegisterTaskDefinition",
          "ecs:ListTasks",
          "ecs:DescribeClusters"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = [
          for env in local.environments :
          "arn:aws:iam::*:role/portfolio-${env}-*"
        ]
        Condition = {
          StringEquals = {
            "iam:PassedToService" = "ecs-tasks.amazonaws.com"
          }
        }
      }
    ]
  })
}

# Logs policy for deployment user (to check deployment status)
resource "aws_iam_policy" "deployment_logs_policy" {
  name        = "portfolio-deployment-logs-policy"
  description = "CloudWatch Logs access for deployment monitoring"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams",
          "logs:GetLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:*:log-group:/ecs/portfolio-*"
      }
    ]
  })
}

# Attach policies to deployment user
resource "aws_iam_user_policy_attachment" "deployment_ecr_policy_attachment" {
  user       = aws_iam_user.deployment_user.name
  policy_arn = aws_iam_policy.deployment_ecr_policy.arn
}

resource "aws_iam_user_policy_attachment" "deployment_ecs_policy_attachment" {
  user       = aws_iam_user.deployment_user.name
  policy_arn = aws_iam_policy.deployment_ecs_policy.arn
}

resource "aws_iam_user_policy_attachment" "deployment_logs_policy_attachment" {
  user       = aws_iam_user.deployment_user.name
  policy_arn = aws_iam_policy.deployment_logs_policy.arn
}
