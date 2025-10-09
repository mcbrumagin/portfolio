export MICRO_REGISTRY_URL=http://localhost:3000
export ENVIRONMENT=staging

cd server

if npm list -g "nodemon" >/dev/null 2>&1; then
  nodemon npm start
else
  npm start
fi
