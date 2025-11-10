# terraform/static-shared/outputs.tf

# ECR Repository URLs
output "portfolio_ecr_url" {
  description = "Portfolio ECR repository URL"
  value       = aws_ecr_repository.app[0].repository_url
}

output "soundclone_ecr_url" {
  description = "SoundClone ECR repository URL"
  value       = aws_ecr_repository.soundclone-app[0].repository_url
}

output "soundclone_ffmpeg_ecr_url" {
  description = "SoundClone FFmpeg ECR repository URL"
  value       = aws_ecr_repository.soundclone-ffmpeg[0].repository_url
}

# S3 Bucket
output "s3_bucket_name" {
  description = "S3 bucket name for application data"
  value       = aws_s3_bucket.soundclone_data_bucket[0].bucket
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.soundclone_data_bucket[0].arn
}
