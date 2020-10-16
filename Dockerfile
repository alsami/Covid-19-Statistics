FROM nginx:1.19.3
COPY ./default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/covid19-statistics/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80