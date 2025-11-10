# terraform/runtime-env/ecs.tf
# ECS clusters, services, and task definitions

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "portfolio-${terraform.workspace}-cluster"

  tags = {
    Name        = "portfolio-${terraform.workspace}-ecs-cluster"
    Environment = terraform.workspace
  }
}

# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "portfolio-${terraform.workspace}-ecs-task-execution-role"

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
}

# Attach the AWS managed policy for ECS task execution
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Add CloudWatch Logs permissions for ECS task execution role
resource "aws_iam_role_policy" "ecs_task_execution_cloudwatch_policy" {
  name = "portfolio-${terraform.workspace}-ecs-task-execution-cloudwatch-policy"
  role = aws_iam_role.ecs_task_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogStreams"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:*:*"
      }
    ]
  })
}

# Add Secrets Manager permissions for ECS task execution role
resource "aws_iam_role_policy" "ecs_task_execution_secrets_policy" {
  name = "portfolio-${terraform.workspace}-ecs-task-execution-secrets-policy"
  role = aws_iam_role.ecs_task_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [
          "arn:aws:secretsmanager:${var.aws_region}:*:secret:portfolio/${terraform.workspace}/*"
        ]
      }
    ]
  })
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "portfolio-${terraform.workspace}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = local.runtime_role_arn

  container_definitions = jsonencode([
    {
      name      = "portfolio-${terraform.workspace}-container"
      image     = "${local.portfolio_ecr_url}:${local.image_tag}"
      essential = true
      portMappings = [
        {
          containerPort = 8000
          protocol      = "tcp"
        }
      ]

      healthCheck = {
        command     = ["CMD-SHELL", "wget --quiet --tries=1 --spider http://localhost:8000/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 10
      }

      environment = [
        {
          name  = "NODE_ENV"
          value = terraform.workspace
        },
        {
          name  = "MICRO_REGISTRY_URL"
          value = "http://localhost:8000"
        },
        {
          name  = "ENVIRONMENT"
          value = terraform.workspace
        },
        {
          name  = "LOG_LEVEL"
          value = "info"
        },
        {
          name  = "LOG_EXCLUDE_FULL_PATH_IN_LOG_LINES"
          value = "true"
        },
        {
          name  = "LOG_INCLUDE_LINES"
          value = "true"
        }
      ]

      secrets = [
        {
          name      = "MICRO_REGISTRY_TOKEN"
          valueFrom = "${aws_secretsmanager_secret.soundclone_admin_credentials.arn}:portfolio_registry_token::"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/portfolio-${terraform.workspace}"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
          "awslogs-create-group"  = "true"
        }
      }
    },
    {
      name      = "soundclone-${terraform.workspace}-container"
      image     = "${local.soundclone_ecr_url}:${local.image_tag}"
      essential = true
      portMappings = [
        {
          containerPort = 10000
          protocol      = "tcp"
        }
      ]

      healthCheck = {
        command     = ["CMD-SHELL", "wget --quiet --tries=1 --spider http://localhost:10000/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 10
      }

      environment = [
        {
          name  = "NODE_ENV"
          value = terraform.workspace
        },
        {
          name  = "ENVIRONMENT"
          value = terraform.workspace
        },
        {
          name  = "MICRO_REGISTRY_URL"
          value = "http://localhost:10000"
        },
        {
          name  = "LOG_LEVEL"
          value = "debug"
        },
        {
          name  = "LOG_EXCLUDE_FULL_PATH_IN_LOG_LINES"
          value = "true"
        },
        {
          name  = "LOG_INCLUDE_LINES"
          value = "true"
        },
        {
          name  = "NODE_MODULES_DIR"
          value = "../../node_modules"
        },
        {
          name  = "S3_BUCKET_NAME"
          value = local.s3_bucket_name
        },
        {
          name  = "S3_PREFIX"
          value = "soundclone-${terraform.workspace}/"
        },
        {
          name  = "AWS_REGION"
          value = var.aws_region
        }
      ]

      secrets = [
        {
          name      = "MICRO_REGISTRY_TOKEN"
          valueFrom = "${aws_secretsmanager_secret.soundclone_admin_credentials.arn}:soundclone_registry_token::"
        },
        {
          name      = "ADMIN_USER"
          valueFrom = "${aws_secretsmanager_secret.soundclone_admin_credentials.arn}:admin_user::"
        },
        {
          name      = "ADMIN_SECRET"
          valueFrom = "${aws_secretsmanager_secret.soundclone_admin_credentials.arn}:admin_secret::"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/portfolio-${terraform.workspace}"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
          "awslogs-create-group"  = "true"
        }
      }
    },
    {
      name      = "soundclone-${terraform.workspace}-ffmpeg-container"
      image     = "${local.soundclone_ffmpeg_ecr_url}:${local.image_tag}"
      essential = true
      portMappings = [
        {
          containerPort = 11000
          protocol      = "tcp"
        }
      ]

      # No health check - registry in main container acts as health check

      environment = [
        {
          name  = "NODE_ENV"
          value = terraform.workspace
        },
        {
          name  = "ENVIRONMENT"
          value = terraform.workspace
        },
        {
          name  = "MICRO_REGISTRY_URL"
          value = "http://localhost:10000"
        },
        {
          name  = "MICRO_SERVICE_URL"
          value = "http://localhost:11000"
        },
        {
          name  = "LOG_LEVEL"
          value = "debug"
        },
        {
          name  = "LOG_EXCLUDE_FULL_PATH_IN_LOG_LINES"
          value = "true"
        },
        {
          name  = "LOG_INCLUDE_LINES"
          value = "true"
        },
        {
          name  = "S3_BUCKET_NAME"
          value = local.s3_bucket_name
        },
        {
          name  = "S3_PREFIX"
          value = "soundclone-${terraform.workspace}/"
        },
        {
          name  = "AWS_REGION"
          value = var.aws_region
        }
      ]

      secrets = [
        {
          name      = "MICRO_REGISTRY_TOKEN"
          valueFrom = "${aws_secretsmanager_secret.soundclone_admin_credentials.arn}:soundclone_registry_token::"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/portfolio-${terraform.workspace}"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
          "awslogs-create-group"  = "true"
        }
      }
    }
  ])

  tags = {
    Name        = "portfolio-${terraform.workspace}-task-definition"
    Environment = terraform.workspace
  }
}

# ECS Service
resource "aws_ecs_service" "app" {
  name            = "portfolio-${terraform.workspace}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = local.subnet_ids
    security_groups  = [local.ecs_security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.portfolio.arn
    container_name   = "portfolio-${terraform.workspace}-container"
    container_port   = 8000
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.soundclone.arn
    container_name   = "soundclone-${terraform.workspace}-container"
    container_port   = 10000
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  depends_on = [
    aws_lb_listener_rule.portfolio,
    aws_lb_listener_rule.soundclone
  ]

  tags = {
    Name        = "portfolio-${terraform.workspace}-ecs-service"
    Environment = terraform.workspace
  }
}
