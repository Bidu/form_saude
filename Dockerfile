FROM alpine:3.12
EXPOSE 80
ADD config-docker/default.conf /etc/nginx/conf.d/default.conf
COPY . /var/www/form/htdocs
RUN apk add nginx && \
    mkdir /run/nginx && \
    apk add nodejs && \
    apk add npm && \
    cd /var/www/form/htdocs && \
    npm install && \
    npm run build && \
    apk del nodejs && \
    apk del npm && \
    mv /var/www/form/htdocs/build /var/www/form && \
    cd /var/www/form/htdocs && \
    rm -rf * && \
    mv /var/www/form/build /var/www/form/htdocs/;
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /var/www/form/htdocs