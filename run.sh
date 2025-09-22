export SERVICE_REGISTRY_ENDPOINT=http://localhost:3000
cd server

if npm list -g "nodemon" >/dev/null 2>&1; then
  nodemon npm start
else
  npm start
fi
