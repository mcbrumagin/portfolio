#!/bin/bash

# Configure ECS agent
echo ECS_CLUSTER=${cluster_name} >> /etc/ecs/ecs.config
echo ECS_ENABLE_CONTAINER_METADATA=true >> /etc/ecs/ecs.config

# Start ECS agent
systemctl enable ecs
systemctl start ecs

# Install CloudWatch agent for monitoring
yum update -y
yum install -y amazon-cloudwatch-agent

# Configure log rotation
echo '/var/log/ecs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}' > /etc/logrotate.d/ecs
