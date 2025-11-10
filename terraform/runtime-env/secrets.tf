# terraform/runtime-env/secrets.tf
# Environment-specific secrets using AWS Secrets Manager

# Admin credentials for SoundClone
resource "aws_secretsmanager_secret" "soundclone_admin_credentials" {
  name        = "portfolio/${terraform.workspace}/soundclone/admin"
  description = "Admin credentials for SoundClone application in ${terraform.workspace}"
  
  tags = {
    Name        = "portfolio-${terraform.workspace}-soundclone-admin"
    Environment = terraform.workspace
    Application = "SoundClone"
  }
}

# Secret version with values from tfvars
resource "aws_secretsmanager_secret_version" "soundclone_admin_credentials" {
  secret_id = aws_secretsmanager_secret.soundclone_admin_credentials.id
  secret_string = jsonencode({
    portfolio_registry_token = var.portfolio_registry_token != "" ? var.portfolio_registry_token : "changeme"
    soundclone_registry_token = var.soundclone_registry_token != "" ? var.soundclone_registry_token : "changeme"
    admin_user   = var.soundclone_admin_user != "" ? var.soundclone_admin_user : "admin"
    admin_secret = var.soundclone_admin_secret != "" ? var.soundclone_admin_secret : "changeme"
  })
}
