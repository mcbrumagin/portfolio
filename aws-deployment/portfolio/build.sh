#!/bin/bash
set -e

# Build script for ARM64 portfolio container

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

IMAGE_NAME="portfolio-app"
TAG="${1:-latest}"

echo "Building ARM64 portfolio container..."
echo "Image: ${IMAGE_NAME}:${TAG}"

# Build for ARM64
docker build \
  --platform linux/arm64 \
  -t "${IMAGE_NAME}:${TAG}" \
  -f "${SCRIPT_DIR}/Dockerfile" \
  "${PROJECT_ROOT}"

echo "Build complete!"
echo "To run locally: docker run -p 8000:8000 ${IMAGE_NAME}:${TAG}"

