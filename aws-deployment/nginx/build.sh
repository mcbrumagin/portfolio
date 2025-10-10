#!/bin/bash
set -e

# Build script for ARM64 nginx container

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

IMAGE_NAME="portfolio-nginx"
TAG="${1:-latest}"

echo "Building ARM64 nginx container..."
echo "Image: ${IMAGE_NAME}:${TAG}"

# Build for ARM64
docker build \
  --platform linux/arm64 \
  -t "${IMAGE_NAME}:${TAG}" \
  "${SCRIPT_DIR}"

echo "Build complete!"
echo "To run locally: docker run -p 80:80 -p 443:443 ${IMAGE_NAME}:${TAG}"

