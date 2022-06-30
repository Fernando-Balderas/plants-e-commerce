# E-Commerce Client 

## Docker
```bash
# create image
docker build -t e-commerce-client:1.0.0 .
# start app
docker run --rm -p 3000:3000 e-commerce-client:1.0.0
# open link in a browser
http://localhost:3000
# Upoad image to docker hub
docker tag e-commerce-client:1.0.0 fbalderasd/e-commerce-client:1.0.0
docker push fbalderasd/e-commerce-client:1.0.0
```