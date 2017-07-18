const { getDefaultUserId } = require('./user')

/**
 * JSDocs schema of an Entry
 * @typedef {({id?: number, message: string, userId?: number, created?: number, edited?: number})} Entry
 */

/**
 * JSDocs schema of the user supplied input of a new or edited Entry
 * @typedef {({message: string})} EntryInput
 */

/**
 * Stores the current state of the app
 *
 * _Will not keep state accross server re-starts_
 * @type {Entry[]}
 */
let entriesState = []

/**
 * Helper state to keep id monotonically increasing, even if items get deleted
 */
let idCounter = 0

/**
 * Helper to find an index
 * @param {number} id
 */
const findEntryById = (id) => entriesState.findIndex((entry) => entry.id === id)

/**
 * Adds a new `Entry` to the state
 * @param {EntryInput} newEntry New `Entry` to add
 */
const createEntry = (newEntry) => {
  const length = entriesState.push(Object.assign(
    {
      message: newEntry.message // use only message for now, but keep as object, to make refactoring easier
    },
    {
      id: ++idCounter,
      userId: getDefaultUserId(),
      created: Date.now()
    }
  ))
  return entriesState[length - 1]
}

/**
 * Get all `Entry`s
 * @returns {Entry[]}
 */
const getEntrys = () => {
  return entriesState
}

/**
 * Edit values of a `Entry` in the state
 * @param {number} id  id of the `Entry` to edit
 * @param {EntryInput} newEntry Partial of `Entry` with values that should be updated
 * @returns {Entry|null} The edited `Entry` or `null` if it was not found
 */
const updateEntry = (id, newEntry) => {
  const indexToEdit = findEntryById(id)
  if (indexToEdit === -1) {
    return null
  }

  entriesState[indexToEdit] = Object.assign(
    {}, // ensure it's a new object
    entriesState[indexToEdit], // use existing as base
    newEntry,
    { edited: Date.now() } // ensure edited is set
  )
  return entriesState[indexToEdit]
}

/**
 * Deletes a `Entry` from the state
 * @param {number} id id of the `Entry` to delete
 * @returns {Entry|null} The deleted `Entry` or `null` if it was not found
 */
const deleteEntry = (id) => {
  const indexToDelete = findEntryById(id)
  if (indexToDelete === -1) {
    return null
  }
  return entriesState.splice(indexToDelete, 1)[0]
}

module.exports = {
  createEntry,
  getEntrys,
  updateEntry,
  deleteEntry
}
