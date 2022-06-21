docker build -t e-commerce-db:1.0.0 .
docker run -d -p 5432:5432 --name e-commerce-db --restart unless-stopped e-commerce-db:1.0.0