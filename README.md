# soliloquy-server

Graphql Server for Soliloquy single-user chat app.

# Setup
```
yarn install
yarn start
```

## Run test
```
yarn test
```

or with coverage
```
yarn coverage
```


# GraphQL Endpoint
The GraphQL endpoint is available under [`/graphql`](http://localhost:8080/graphql)

# GraphiQL Endpoint
To see the inteactive GraphiQL UI open [`/graphiql`](http://localhost:8080/graphql)

# Sample Queries

## get all data for a user
```
{
  user(id: "1") {
    name,
    initials,
    entries {
      id,
      message,
      created,
      edited
    }
  }
}
```

## createEntry
```
mutation {
  createEntry(newEntry: {message: "hope is a good thing 1"}) {
    id,
    message,
    created,
    edited
  }
}

```

## updateEntry
```
mutation {
  updateEntry(id: "entry_4", changes: {message: "update"}) {
    id
    message
    created
    edited
  }
}

```

## deleteEntry
```
mutation {
  deleteEntry(id: "entry_2") {
    id
  }
}

```