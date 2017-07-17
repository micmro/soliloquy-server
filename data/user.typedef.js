const Entry = require('./entry.typedef')

const User = `
  # A User in the chat app
  type User {
    # ID of the User
    id: Int!
    # Name of the User
    name: String!
    # Surname of the User
    surname: String!
    # Entries the User has created
    entries: [Entry]
    # Initials of the user
    initials: String!
  }
`

module.exports = [User, Entry]
