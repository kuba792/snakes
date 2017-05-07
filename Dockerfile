FROM node:alpine
RUN npm install -g nodemon
RUN mkdir /data
WORKDIR /data

EXPOSE 80
CMD ["nodemon", "app.js"]
