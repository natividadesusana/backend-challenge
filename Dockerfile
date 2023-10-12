FROM node:alpine

WORKDIR /app/backend

COPY . .

EXPOSE 3000

RUN npm install
RUN npm run build

CMD ["npm", "start"]
