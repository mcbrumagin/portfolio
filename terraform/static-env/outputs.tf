# terraform/static-env/outputs.tf

# Runtime Role ARNs (per environment)
output "runtime_role_arns" {
  description = "Runtime role ARNs for dev and prod"
  value = {
    for env in local.environments :
    env => aws_iam_role.app_runtime_role[env].arn
  }
}

# Deployment user credentials
output "deployment_user_access_key_id" {
  description = "Access key ID for deployment user (add to GitHub secrets)"
  value       = aws_iam_access_key.deployment_user_key.id
  sensitive   = true
}

output "deployment_user_secret_access_key" {
  description = "Secret access key for deployment user (add to GitHub secrets)"
  value       = aws_iam_access_key.deployment_user_key.secret
  sensitive   = true
}
