FROM node:16.15-alpine as builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16.15-alpine
# these below are not working
# ARG REACT_APP_GOOGLE_CLIENT_ID
# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
WORKDIR /app
COPY --from=builder /app/build ./build
RUN yarn global add serve
ENTRYPOINT ["serve"]
CMD ["-n", "build"]