# terraform/runtime-shared/ssl.tf
# SSL Certificates for all domains (dev and prod)

# Portfolio SSL Certificate (covers both prod and dev)
resource "aws_acm_certificate" "portfolio" {
  domain_name = var.portfolio_domain_name
  subject_alternative_names = [
    "www.${var.portfolio_domain_name}",
    "dev.${var.portfolio_domain_name}"
  ]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "portfolio-mcbrumagin-cert"
    Environment = "shared"
  }
}

# SoundClone SSL Certificate (covers both prod and dev)
resource "aws_acm_certificate" "soundclone" {
  domain_name = var.soundclone_domain_name
  subject_alternative_names = [
    "www.${var.soundclone_domain_name}",
    "dev.${var.soundclone_domain_name}"
  ]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "portfolio-soundclone-cert"
    Environment = "shared"
  }
}

# Certificate validation for Portfolio
resource "aws_acm_certificate_validation" "portfolio" {
  certificate_arn         = aws_acm_certificate.portfolio.arn
  validation_record_fqdns = [for record in aws_route53_record.portfolio_cert_validation : record.fqdn]

  timeouts {
    create = "5m"
  }
}

# Certificate validation for SoundClone
resource "aws_acm_certificate_validation" "soundclone" {
  certificate_arn         = aws_acm_certificate.soundclone.arn
  validation_record_fqdns = [for record in aws_route53_record.soundclone_cert_validation : record.fqdn]

  timeouts {
    create = "5m"
  }
}

