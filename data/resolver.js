const entry = require('./entry')
const user = require('./user')

const RootSchema = `

  type RootQuery {
    user(id: Int!): User
    entrys: [Entry]
  }

  type Mutation {

    # Creates a new chat Entry
    createEntry(newEntry: EntryInput): Entry

    # updates an existing chat Entry
    updateEntry(
      # ID of Entry to update
      id: Int!,
      # Object with changed keys
      changes: EntryInput
    ): Entry

    # updates an existing chat Entry
    deleteMessage(
      # ID of Entry to delete
      id: Int
    ): Entry
  }

  schema {
    query: RootQuery
    mutation: Mutation
  }
`

const resolvers = {
  RootQuery: {
    user: (_, { id }) => user.getUser(id),
    entrys: () => entry.getEntrys()
  },

  Mutation: {
    createEntry: (_, { newEntry }) => entry.createEntry(newEntry),
    updateEntry: (_, { id, changes }) => entry.updateEntry(id, changes),
    deleteMessage: (_, { id }) => entry.deleteMessage(id)
  },

  User: {
    entries: (user) => entry.getEntrys().filter(e => e.userId === user.id),
    initials: (user) => user.name[0].toUpperCase() + user.surname[0].toUpperCase()
  }
}

module.exports = {
  RootSchema,
  resolvers
}
