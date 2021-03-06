const entry = require('./entry')
const user = require('./user')

const RootSchema = `

  type RootQuery {
    # Gets a User and all their Entries
    user(id: ID!): User
    # Get all Entries
    entries: [Entry]
  }

  type Mutation {

    # Creates a new chat Entry
    createEntry(newEntry: EntryInput): Entry

    # updates an existing chat Entry
    updateEntry(
      # ID of Entry to update
      id: ID!,
      # Object with changed keys
      changes: EntryInput
    ): Entry

    # updates an existing chat Entry
    deleteEntry(
      # ID of Entry to delete
      id: ID
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
    entries: () => entry.getEntries()
  },

  Mutation: {
    createEntry: (_, { newEntry }) => entry.createEntry(newEntry),
    updateEntry: (_, { id, changes }) => entry.updateEntry(id, changes),
    deleteEntry: (_, { id }) => entry.deleteEntry(id)
  },

  /** Extra resolvers for computed attributes */
  User: {
    entries: (user) => entry.getEntries().filter(e => e.userId === user.id),
    initials: (user) => user.name[0].toUpperCase() + user.surname[0].toUpperCase()
  }
}

module.exports = {
  RootSchema,
  resolvers
}
