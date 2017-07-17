const Entry = `
  # an entry in the chat
  type Entry {
    # ID of the Entry
    id: Int!
    # Chat Message
    message: String!
    # ID of the User that has created the entry
    userId: String!
    # Creation time (as Unix timestamp)
    created: Float!
    # Edited time (as Unix timestamp), 'null' if not edited
    edited: Float
  }

  # Entry type for creation
  input EntryInput {
    # Chat Message
    message: String!
  }
`

module.exports = Entry
