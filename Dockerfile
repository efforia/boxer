FROM node:latest

# Install pip requirements
ADD package.json .
RUN npm i

WORKDIR /app
ADD . /app

# EXPOSE 5000
# ENV DATABASE_PWD=...
# ENV DATABASE_USER=...
# ENV DATABASE_HOST=...
# ENV DATABASE_NAME=...

CMD npm start
