# Terraform outputs

output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.main.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance (Elastic IP)"
  value       = aws_eip.main.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.main.public_dns
}

output "security_group_id" {
  description = "ID of the security group"
  value       = aws_security_group.ec2.id
}

output "ssh_connection" {
  description = "SSH connection command"
  value       = "ssh -i ~/.ssh/${var.key_name}.pem ec2-user@${aws_eip.main.public_ip}"
}

