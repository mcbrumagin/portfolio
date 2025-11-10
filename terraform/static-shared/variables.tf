# terraform/static-shared/variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket for application data"
  type        = string
  default     = "soundclone-data"
}

