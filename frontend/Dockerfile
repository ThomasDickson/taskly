FROM node:20

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app

# install packages
RUN npm install

# test
RUN npm test

# build
RUN npm run build

# start
RUN npm install --global serve
EXPOSE 3000
CMD ["serve", "build"]