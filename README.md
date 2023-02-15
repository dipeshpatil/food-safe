# food-safe

# Running via Docker

set config password env variable

```sh
export CONFIG_PASS="<CONFIG PASSWORD>"
```

build docker image

```sh
docker build --build-arg var_name=${CONFIG_PASS}  -t food-safe-node .
```

run the container

```sh
docker run -p 3001:3001 -d --name food-safe-app -v "$(pwd):/app" -v /app/node_modules food-safe-node
```
