FROM node:16.15-alpine as builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
# ENV MONGODB_URI="" JWT_SECRET="" PORT=5000
ENTRYPOINT ["yarn"]
CMD ["start"]