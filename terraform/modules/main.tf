# modules/main.tf
#
# Portfolio Infrastructure Module
#
# This module creates all the necessary AWS infrastructure for the portfolio application:
# - VPC and networking components
# - ECR repository for Docker images
# - Application Load Balancer with SSL
# - ECS cluster and services
# - CloudWatch logging
# - Route53 DNS records and certificate validation
#
# The module is designed to be environment-agnostic and can be used for dev, staging, prod, etc.

# Include all the infrastructure components
# (The actual resources are defined in the individual .tf files in this directory)
