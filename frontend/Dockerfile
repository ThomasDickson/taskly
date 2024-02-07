FROM node:20

WORKDIR /app

COPY . .

RUN npm run build
RUN npm install --global serve

EXPOSE 3000

CMD ["serve", "build"]