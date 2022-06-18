FROM postgres:14.3

ENV POSTGRES_PASSWORD=mysecretpassword
ADD ./schema/e-commerce.sql /docker-entrypoint-initdb.d/e-commerce.sql

VOLUME pgdata-e-commerce:/var/lib/postgresql/data