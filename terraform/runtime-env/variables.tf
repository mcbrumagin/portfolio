# terraform/runtime-env/variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "portfolio_domain_name" {
  description = "Domain name for the portfolio application"
  type        = string
  default     = "mcbrumagin.com"
}

variable "soundclone_domain_name" {
  description = "Domain name for the SoundClone application"
  type        = string
  default     = "soundcl.one"
}

variable "soundclone_admin_user" {
  description = "Admin username for SoundClone (will be stored in Secrets Manager)"
  type        = string
  default     = ""
  sensitive   = true
}

variable "soundclone_admin_secret" {
  description = "Admin password for SoundClone (will be stored in Secrets Manager)"
  type        = string
  default     = ""
  sensitive   = true
}

variable "portfolio_registry_token" {
  description = "Registry token for the portfolio application"
  type        = string
  default     = ""
  sensitive   = true
}

variable "soundclone_registry_token" {
  description = "Registry token for the SoundClone application"
  type        = string
  default     = ""
  sensitive   = true
}
