# terraform/s3-bucket.tf

# Data source to reference existing S3 bucket in dev/prod workspaces
data "aws_s3_bucket" "soundclone_data_bucket" {
  count  = terraform.workspace != "default" ? 1 : 0
  bucket = var.s3_bucket_name
}

# Only create S3 bucket in default workspace to avoid conflicts
resource "aws_s3_bucket" "soundclone_data_bucket" {
  count  = terraform.workspace == "default" ? 1 : 0
  bucket = var.s3_bucket_name
  tags = {
    Project     = "SoundClone"
  }
}

# S3 bucket versioning
# resource "aws_s3_bucket_versioning" "soundclone_data_versioning" {
#   bucket = aws_s3_bucket.soundclone_data_bucket.id
#   versioning_configuration {
#     status = "Enabled"
#   }
# }

# S3 bucket server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "soundclone_data_encryption" {
  count  = terraform.workspace == "default" ? 1 : 0
  bucket = aws_s3_bucket.soundclone_data_bucket[0].id

  rule {
    bucket_key_enabled = true

    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# S3 bucket public access block
resource "aws_s3_bucket_public_access_block" "soundclone_data_pab" {
  count  = terraform.workspace == "default" ? 1 : 0
  bucket = aws_s3_bucket.soundclone_data_bucket[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
