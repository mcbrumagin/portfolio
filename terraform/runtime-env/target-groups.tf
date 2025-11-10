# terraform/runtime-env/target-groups.tf
# Environment-specific target groups attached to shared ALB

# Portfolio Target Group
resource "aws_lb_target_group" "portfolio" {
  name        = "portfolio-${terraform.workspace}-tg"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    Name        = "portfolio-${terraform.workspace}-tg"
    Environment = terraform.workspace
  }
}

# SoundClone Target Group
resource "aws_lb_target_group" "soundclone" {
  name        = "soundclone-${terraform.workspace}-tg"
  port        = 10000
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    Name        = "soundclone-${terraform.workspace}-tg"
    Environment = terraform.workspace
  }
}

# ALB Listener Rules for Portfolio
resource "aws_lb_listener_rule" "portfolio" {
  listener_arn = local.alb_listener_arn
  priority     = terraform.workspace == "prod" ? 10 : 20

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.portfolio.arn
  }

  condition {
    host_header {
      values = (
        terraform.workspace == "prod"
          ? [var.portfolio_domain_name, "www.${var.portfolio_domain_name}"]
          : ["dev.${var.portfolio_domain_name}"]
      )
    }
  }
}

# ALB Listener Rules for SoundClone
resource "aws_lb_listener_rule" "soundclone" {
  listener_arn = local.alb_listener_arn
  priority     = terraform.workspace == "prod" ? 100 : 200

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.soundclone.arn
  }

  condition {
    host_header {
      values = (
        terraform.workspace == "prod"
          ? [var.soundclone_domain_name, "www.${var.soundclone_domain_name}"] 
          : ["dev.${var.soundclone_domain_name}"]
      )
    }
  }
}

