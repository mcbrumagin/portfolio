export MICRO_REGISTRY_URL=http://localhost:3000
export LOG_INCLUDE_LINES=true
export LOG_EXCLUDE_FULL_PATH_IN_LOG_LINES=true
# export ENVIRONMENT=staging

cd server

if npm list -g "nodemon" >/dev/null 2>&1; then
  nodemon npm start
else
  npm start
fi
