const entry = require('./entry')
const user = require('./user')

const RootSchema = `

  type RootQuery {
    # Gets a User and all their Entries
    user(id: Int!): User
    # Get all Entries
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
    deleteEntry(
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
    deleteEntry: (_, { id }) => entry.deleteEntry(id)
  },

  /** Extra resolvers for computed attributes */
  User: {
    entries: (user) => entry.getEntrys().filter(e => e.userId === user.id),
    initials: (user) => user.name[0].toUpperCase() + user.surname[0].toUpperCase()
  }
}

module.exports = {
  RootSchema,
  resolvers
}
