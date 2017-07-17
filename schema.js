const { makeExecutableSchema } = require('graphql-tools')
const { RootSchema, resolvers } = require('./data/resolver')
const User = require('./data/user.typedef')

const schema = makeExecutableSchema({
  typeDefs: [
    RootSchema,
    ...User
  ],
  resolvers: resolvers
  // allowUndefinedInResolve: false
  // resolverValidationOptions: {
  //   // requireResolversForArgs: true,
  //   // requireResolversForNonScalar: true
  // }
})

module.exports = schema
