const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { env } = require('process')

const port = env.PORT || 3000
const app = express()
const graphQLSchema = require('./schema')

// options object
const GraphQLOptions = {
  schema: graphQLSchema,
  debug: env.NODE_ENV === 'development'
}

app.use('/graphql', bodyParser.json(), graphqlExpress(GraphQLOptions))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
