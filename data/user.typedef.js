const Entry = require('./entry.typedef')

const User = `
  # A User in the app
  type User {
    id: Int!
    name: String!
    surname: String!
    entries: [Entry]
    initials: String!
  }
`

module.exports = [User, Entry]
