FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

ENV REDIS_URL=redis://redis:6379

ENV MONGO_URL=mongodb://the_username:the_password@mongo:27017/the_database

# npm start is the command to start the application in development mode
CMD ["npm", "start"]