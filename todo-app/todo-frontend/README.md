# React application

This application is created from create-react-app.

Install dependencies with `npm install`

You can run the application in development mode with `npm start`

You can build static files for production release with `npm run build`

You can run tests with `npm run test`

## Environment variables

Use REACT_APP_BACKEND_URL to set where the backend for this application is.


Notes:
Start docker compose: docker compose -f docker-compose.dev.yml up
Start todo-backend: REDIS_URL=redis://localhost:6379 MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev
Docker build with Dockerfile: docker build . -t todo-frontend
Docker container run: docker run -p 8000:80 todo-frontend
Start todo-frontend dev: REACT_APP_BACKEND_URL=http://localhost:3000 npm start
