# type-graphql-practice
TypeGraphQL with Apollo, Express, Postgres, Redis, Typeorm and Typescript

```sh

cp .env.example .env # modify variables

cp ormconfig.example.json ormconfig.json # modify variables

docker-compose up

# connect to docker database container
create database <database-name>; # ormconfig.json

yarn start

```

Visit `http://localhost:4000/graphql`
