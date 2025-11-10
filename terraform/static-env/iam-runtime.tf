# terraform/static-env/iam-runtime.tf
# Runtime IAM roles for ECS tasks - creates roles for both dev and prod

# ECS Task Role for runtime permissions (one per environment)
resource "aws_iam_role" "app_runtime_role" {
  for_each = toset(local.environments)
  name     = "portfolio-${each.value}-runtime-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "portfolio-${each.value}-runtime-role"
    Environment = each.value
  }
}

# S3 Policy for runtime access with environment isolation
resource "aws_iam_policy" "app_runtime_s3_policy" {
  for_each    = toset(local.environments)
  name        = "portfolio-${each.value}-runtime-s3-policy"
  description = "S3 access policy for ${each.value} runtime with environment isolation"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "${local.s3_bucket_arn}/soundclone-${each.value}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = local.s3_bucket_arn
        Condition = {
          StringLike = {
            "s3:prefix" = ["soundclone-${each.value}/*"]
          }
        }
      }
    ]
  })
}

# Secrets Manager policy for runtime access
resource "aws_iam_policy" "app_runtime_secrets_policy" {
  for_each    = toset(local.environments)
  name        = "portfolio-${each.value}-runtime-secrets-policy"
  description = "Secrets Manager access policy for ${each.value} runtime"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [
          "arn:aws:secretsmanager:${var.aws_region}:*:secret:portfolio/${each.value}/*"
        ]
      }
    ]
  })
}

# Attach S3 policy to runtime role
resource "aws_iam_role_policy_attachment" "app_runtime_s3_policy_attachment" {
  for_each   = toset(local.environments)
  role       = aws_iam_role.app_runtime_role[each.value].name
  policy_arn = aws_iam_policy.app_runtime_s3_policy[each.value].arn
}

# Attach Secrets policy to runtime role
resource "aws_iam_role_policy_attachment" "app_runtime_secrets_policy_attachment" {
  for_each   = toset(local.environments)
  role       = aws_iam_role.app_runtime_role[each.value].name
  policy_arn = aws_iam_policy.app_runtime_secrets_policy[each.value].arn
}
