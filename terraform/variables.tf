variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name to be used for tagging"
  type        = string
  default     = "portfolio"
}

variable "environment" {
  description = "Environment (dev/prod)"
  type        = string
  default     = "dev"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  # Example: "example.com"
}

variable "enable_ssl" {
  description = "Enable SSL/HTTPS"
  type        = bool
  default     = true
}
