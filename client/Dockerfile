# Stage 1
FROM node:14 as build-stage

WORKDIR /client
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /client/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'

# FROM: install the image of the Node.js version.
# WORKDIR: path of the working directory.
# COPY: copy package.json file to the container, then the second one copies all the files inside the project directory.
# RUN: execute a command-line inside the container: npm install to install the dependencies in package.json.
# ARG and ENV: get argument and set environment variable (prefix REACT_APP_ is required).
# run script npm run build after the image is built, the product will be stored in build folder.