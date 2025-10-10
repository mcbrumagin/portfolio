#!/bin/bash

# Script to check for common orphaned AWS resources that could be costing money
# Run this in your AWS CLI configured environment

echo "=== Checking for Orphaned AWS Resources ==="
echo ""

echo "1. Default VPCs (can usually be deleted if not in use):"
aws ec2 describe-vpcs --filters "Name=is-default,Values=true" --query 'Vpcs[*].[VpcId,IsDefault,State]' --output table
echo ""

echo "2. Unused Elastic IPs (cost money when not attached):"
aws ec2 describe-addresses --query 'Addresses[?AssociationId==null].[PublicIp,AllocationId]' --output table
echo ""

echo "3. Unattached EBS Volumes:"
aws ec2 describe-volumes --filters "Name=status,Values=available" --query 'Volumes[*].[VolumeId,Size,VolumeType,CreateTime]' --output table
echo ""

echo "4. Unused Security Groups (check if any are not attached to resources):"
aws ec2 describe-security-groups --query 'SecurityGroups[?GroupName!=`default`].[GroupId,GroupName,Description]' --output table
echo ""

echo "5. Load Balancers:"
aws elbv2 describe-load-balancers --query 'LoadBalancers[*].[LoadBalancerName,LoadBalancerArn,State.Code,Type]' --output table
echo ""

echo "6. Target Groups:"
aws elbv2 describe-target-groups --query 'TargetGroups[*].[TargetGroupName,TargetGroupArn,Protocol,Port]' --output table
echo ""

echo "7. NAT Gateways (expensive if not needed):"
aws ec2 describe-nat-gateways --query 'NatGateways[*].[NatGatewayId,State,VpcId]' --output table
echo ""

echo "8. ECR Repositories:"
aws ecr describe-repositories --query 'repositories[*].[repositoryName,repositoryUri,createdAt]' --output table
echo ""

echo "9. CloudWatch Log Groups:"
aws logs describe-log-groups --query 'logGroups[*].[logGroupName,retentionInDays,storedBytes]' --output table
echo ""

echo "10. Route53 Hosted Zones:"
aws route53 list-hosted-zones --query 'HostedZones[*].[Name,Id,ResourceRecordSetCount]' --output table
echo ""

echo "=== Manual Checks Recommended ==="
echo "- Check AWS Cost Explorer for unexpected charges"
echo "- Review CloudTrail logs for unused services"
echo "- Check for unused Lambda functions"
echo "- Review RDS instances/snapshots"
echo "- Check for unused CloudFormation stacks"
