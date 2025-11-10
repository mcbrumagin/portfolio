# terraform/runtime-shared/outputs.tf

# ALB outputs
output "alb_arn" {
  description = "ARN of the shared ALB"
  value       = aws_lb.main.arn
}

output "alb_dns_name" {
  description = "DNS name of the shared ALB"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the shared ALB"
  value       = aws_lb.main.zone_id
}

output "alb_listener_arn" {
  description = "ARN of the HTTPS listener"
  value       = aws_lb_listener.https.arn
}

# Networking outputs
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "alb_security_group_id" {
  description = "ALB security group ID"
  value       = aws_security_group.alb.id
}

output "ecs_security_group_id" {
  description = "ECS tasks security group ID"
  value       = aws_security_group.ecs_tasks.id
}

