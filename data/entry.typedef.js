const Entry = `
  # an entry in the chat
  type Entry {
    id: Int!
    message: String!
    userId: String!
    created: Float!
    edited: Float
  }

  # Entry type for creation
  input EntryInput {
    message: String!
  }
`

module.exports = Entry
