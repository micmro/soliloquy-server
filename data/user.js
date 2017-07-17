/**
 * JSDocs schema of a `User`
 * @typedef {({id: string, name: string, surname: string, avatar?: string})} User
 */

const usersState = [{
  id: 1,
  name: 'Michael',
  surname: 'Mrowetz'
}]

/**
 * Returns the default `User`
 * @returns {number} ID of the default `User`
 */
const getDefaultUserId = () => 1

/**
 * Finds and returns a single `User` by it's id
 * @param {number} id id of the `User` to find
 * @returns {User|null} The `User` or `null` if it was not found
 */
const getUser = (id) => usersState.find(user => user.id === id) || null

module.exports = {
  getDefaultUserId,
  getUser
}
