# terraform/outputs.tf

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = (
    length(aws_ecr_repository.app) > 0
    ? aws_ecr_repository.app[0].repository_url
    : data.aws_ecr_repository.app[0].repository_url
  )
}
