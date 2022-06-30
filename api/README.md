# E-Commerce API 

## Docker
```bash
# create image (probably needs --no-cache)
docker build -t e-commerce-api .

# start app
docker run --rm -it -p 5000:5000 \
    -e MONGODB_URI="" \
    -e JWT_SECRET="" \
    -e PORT="" e-commerce-api

# api available in
http://localhost:5000

# Upoad image to docker hub
docker tag e-commerce-api fbalderasd/e-commerce-api
docker push fbalderasd/e-commerce-api
```