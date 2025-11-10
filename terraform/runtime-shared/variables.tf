# terraform/runtime-shared/variables.tf

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

