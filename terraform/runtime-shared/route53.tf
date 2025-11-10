# terraform/runtime-shared/route53.tf
# Route53 configuration for all domains

# Data source for portfolio hosted zone
data "aws_route53_zone" "portfolio" {
  name         = var.portfolio_domain_name
  private_zone = false
}

# Data source for soundclone hosted zone
data "aws_route53_zone" "soundclone" {
  name         = var.soundclone_domain_name
  private_zone = false
}

# Portfolio A records
resource "aws_route53_record" "portfolio_prod" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = var.portfolio_domain_name
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "portfolio_www" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "www.${var.portfolio_domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "portfolio_dev" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "dev.${var.portfolio_domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# SoundClone A records
resource "aws_route53_record" "soundclone_prod" {
  zone_id = data.aws_route53_zone.soundclone.zone_id
  name    = var.soundclone_domain_name
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "soundclone_www" {
  zone_id = data.aws_route53_zone.soundclone.zone_id
  name    = "www.${var.soundclone_domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "soundclone_dev" {
  zone_id = data.aws_route53_zone.soundclone.zone_id
  name    = "dev.${var.soundclone_domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# Certificate validation records for Portfolio
resource "aws_route53_record" "portfolio_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.portfolio.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.portfolio.zone_id
}

# Certificate validation records for SoundClone
resource "aws_route53_record" "soundclone_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.soundclone.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.soundclone.zone_id
}

