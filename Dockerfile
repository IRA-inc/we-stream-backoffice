FROM mhart/alpine-node:14 AS builder
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=8096"
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]