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

  // values to be used as context and rootValue in resolvers
  // context?: any,
  // rootValue?: any,

  // function used to format errors before returning them to clients
  // formatError?: Function,

  // additional validation rules to be applied to client-specified queries
  // validationRules?: Array<ValidationRule>,

  // function applied for each query in a batch to format parameters before passing them to `runQuery`
  // formatParams?: Function,

  // function applied to each response before returning data to clients
  // formatResponse?: Function,

  // a boolean option that will trigger additional debug logging if execution errors occur
  debug: true
}

app.use('/graphql', bodyParser.json(), graphqlExpress(GraphQLOptions))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.listen(port)
