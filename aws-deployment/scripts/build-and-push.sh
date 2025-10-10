#!/bin/bash
set -e

# Build and push Docker images
# This script builds both images and pushes them to a registry

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AWS_DEPLOYMENT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$AWS_DEPLOYMENT_DIR/.." && pwd)"

# Configuration
REGISTRY="${DOCKER_REGISTRY:-docker.io}"
NAMESPACE="${DOCKER_NAMESPACE:-your-username}"
TAG="${TAG:-latest}"

PORTFOLIO_IMAGE="${REGISTRY}/${NAMESPACE}/portfolio-app:${TAG}"
NGINX_IMAGE="${REGISTRY}/${NAMESPACE}/portfolio-nginx:${TAG}"

echo "=== Building and Pushing Docker Images ==="
echo "Registry: $REGISTRY"
echo "Namespace: $NAMESPACE"
echo "Tag: $TAG"
echo ""

# Build portfolio app
echo "Building portfolio application..."
cd "$PROJECT_ROOT"
docker build \
    --platform linux/arm64 \
    -t "$PORTFOLIO_IMAGE" \
    -f aws-deployment/portfolio/Dockerfile \
    .

# Build nginx
echo "Building nginx..."
cd "$AWS_DEPLOYMENT_DIR/nginx"
docker build \
    --platform linux/arm64 \
    -t "$NGINX_IMAGE" \
    .

echo ""
echo "Images built successfully!"
echo ""

# Push images
read -p "Push images to registry? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Pushing images..."
    docker push "$PORTFOLIO_IMAGE"
    docker push "$NGINX_IMAGE"
    echo ""
    echo "Images pushed successfully!"
    echo ""
    echo "Update your docker-compose.yml with:"
    echo "  portfolio-app image: $PORTFOLIO_IMAGE"
    echo "  nginx image: $NGINX_IMAGE"
else
    echo "Skipping push."
fi

echo ""
echo "Done!"

