# terraform/ecs.tf

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-${terraform.workspace}-cluster"

  tags = {
    Name        = "${var.project_name}-${terraform.workspace}-ecs-cluster"
    Environment = var.environment
  }
}

# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project_name}-${terraform.workspace}-ecs-task-execution-role"

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
  name = "${var.project_name}-${terraform.workspace}-ecs-task-execution-cloudwatch-policy"
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

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-${terraform.workspace}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = "256"  # 256 is the minimum for Fargate
  memory                  = "512"  # 512 is the minimum for 256 CPU
  execution_role_arn      = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "${var.project_name}-${terraform.workspace}-container"
      image = "${data.aws_ecr_repository.app[0].repository_url}:${var.environment == "prod" ? "latest" : "dev-latest"}"
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
          value = var.environment
        },
        {
          name  = "MICRO_REGISTRY_URL"
          value = "http://localhost:8000"
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${var.project_name}-${terraform.workspace}"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
          "awslogs-create-group"  = "true"
        }
      }
    }
  ])

  tags = {
    Name        = "${var.project_name}-${terraform.workspace}-task-definition"
    Environment = var.environment
  }
}

# ECS Service
resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-${terraform.workspace}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.environment == "dev" ? 1 : 1  # Single instance for both dev and prod to save costs
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "${var.project_name}-${terraform.workspace}-container"
    container_port   = 8000
  }

  deployment_circuit_breaker {
    enable  = true
    rollback = true
  }

  depends_on = [aws_lb_listener.https]

  tags = {
    Name        = "${var.project_name}-${terraform.workspace}-ecs-service"
    Environment = var.environment
  }
}
