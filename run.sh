export MICRO_REGISTRY_URL=http://localhost:3000
export LOG_INCLUDE_LINES=true
export LOG_EXCLUDE_FULL_PATH_IN_LOG_LINES=true
export ENVIRONMENT=dev
# export LOG_LEVEL=info
export MUTE_LOG_GROUP_OUTPUT=true
export LOG_INCLUDE_LINES=true
export LOG_EXCLUDE_FULL_PATH_IN_LOG_LINES=true

if npm list -g "nodemon" >/dev/null 2>&1; then
  nodemon npm start
else
  npm start
fi
