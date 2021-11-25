FROM node:14.17 as build
COPY . /app
WORKDIR /app
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org && cnpm install yarn -g && yarn install \
    && yarn run docs:build 


FROM nginx as production

COPY cloud.conf /etc/nginx/conf.d

COPY cert/Nginx/. /etc/nginx/certificate

COPY --from=build /app/docs/.vuepress/dist/. /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]