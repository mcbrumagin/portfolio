output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.app.name
}

output "load_balancer_dns" {
  value = aws_lb.main.dns_name
}

output "domain_name" {
  value = var.environment == "prod" ? var.domain_name : "${var.environment}.${var.domain_name}"
}

output "ssl_certificate_arn" {
  value = aws_acm_certificate.main.arn
}
