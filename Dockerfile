FROM node:alpine

RUN npm install -g nodemon

CMD ["nodemon", "app.js"]
