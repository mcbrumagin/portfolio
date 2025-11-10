# terraform/runtime-shared/load-balancer.tf
# Shared ALB for both dev and prod environments

# Application Load Balancer (Shared)
resource "aws_lb" "main" {
  name               = "portfolio-shared-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = false

  tags = {
    Name        = "portfolio-shared-alb"
    Environment = "shared"
  }
}

# ALB Listener for HTTP (redirects to HTTPS)
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# ALB Listener for HTTPS
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate_validation.portfolio.certificate_arn

  # Default action returns 404 - specific rules added by runtime-env modules
  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Not Found"
      status_code  = "404"
    }
  }
}

# Additional certificates for all domains
resource "aws_lb_listener_certificate" "portfolio_www" {
  listener_arn    = aws_lb_listener.https.arn
  certificate_arn = aws_acm_certificate_validation.portfolio.certificate_arn
}

resource "aws_lb_listener_certificate" "soundclone" {
  listener_arn    = aws_lb_listener.https.arn
  certificate_arn = aws_acm_certificate_validation.soundclone.certificate_arn
}
