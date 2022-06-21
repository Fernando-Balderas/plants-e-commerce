docker run -d \
    --name e-commerce-db-dev1 \
    -p 5432:5432 \
    --restart unless-stopped \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -v "$PWD"/schema:/docker-entrypoint-initdb.d \
    postgres:14.3