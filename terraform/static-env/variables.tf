# terraform/static-env/variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket (passed from static-shared module)"
  type        = string
}

variable "s3_bucket_arn" {
  description = "ARN of the S3 bucket (passed from static-shared module)"
  type        = string
}
