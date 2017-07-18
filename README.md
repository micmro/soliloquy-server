# soliloquy-server

Graphql Server for Soliloquy single-user chat app.

# GraphQL Endpoint
The GraphQL endpoint is available under [`/graphql`](http://localhost:3000/graphql)

# GraphiQL Endpoint
To see the inteactive GraphiQL UI open [`/graphiql`](http://localhost:3000/graphql)

# Sample Queries

## get all data for a user
```
{
  user(id: 1) {
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
  updateEntry(id: 4, changes: {message: "update"}) {
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
  deleteEntry(id: 2) {
    id
  }
}

```