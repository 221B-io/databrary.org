I know there are credentials in this repo. They will all be hidden as soon as this has a public port.

# Install Steps

Make sure you have make installed.

## Install command line tools and dependencies necessary for development
```
make install
```

# Start docker containers
```
docker-compose up
```

## Setup Hasura
```
make migrate
```
Note: hasura migrate will work only if there are versions not present in the postgres database

## Remove postgres volume
```
make cleardb
```

## UIs

Databrary: http://localhost:8000
Hasura: http://localhost:8002
Minio: http://localhost:9000
