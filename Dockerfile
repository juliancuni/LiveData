FROM node:12.13.0-alpine
WORKDIR /LiveData
COPY package.json ./LiveData
RUN npm install
COPY . ./LiveData
CMD [ "npm", "run", "dev" ]