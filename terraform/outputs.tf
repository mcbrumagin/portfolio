# terraform/outputs.tf

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = module.portfolio.ecr_repository_url
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.portfolio.ecs_cluster_name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = module.portfolio.ecs_service_name
}

output "load_balancer_dns" {
  description = "DNS name of the Application Load Balancer"
  value       = module.portfolio.alb_dns_name
}

output "domain_name" {
  description = "The domain name for this environment"
  value       = var.environment == "prod" ? var.domain_name : "${var.environment}.${var.domain_name}"
}

output "ssl_certificate_arn" {
  description = "ARN of the SSL certificate"
  value       = module.portfolio.certificate_arn
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = module.portfolio.vpc_id
}