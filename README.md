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

### Caveats

1. Make sure in graphql-playground settings, following is set: `"request.credentials": "include"`

### Available Query and Mutations

*check schema docs*

```graphql
mutation {
  register(data:{
    firstName:"",
    ...
  }) {
    id
    firstName
    ...
  }
}
```

```graphql
mutation {
  login(email:"", password:"") {
    id
    firstName
    ...
  }
}
```

```graphql
query {
  me {
    id
    firstName
    lastName
    email
    name
  }
}
```

### Reference

Ben Awad TypeGraphQL series [playlist](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)


### Testing Setup

```sh

# locate test-utils

cp ormconfig.test.example.json ormconfig.test.json # copy and modify variables

yarn test

```
