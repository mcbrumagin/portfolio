# terraform/runtime-env/outputs.tf

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.app.name
}

output "portfolio_target_group_arn" {
  description = "Portfolio target group ARN"
  value       = aws_lb_target_group.portfolio.arn
}

output "soundclone_target_group_arn" {
  description = "SoundClone target group ARN"
  value       = aws_lb_target_group.soundclone.arn
}

