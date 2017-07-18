const { expect } = require('chai')
let entry = require('./entry')

describe('Entry State', function () {
  /** reserts `entry` to a fresh version of the `./entry` module */
  const reset = function () {
    delete require.cache[require.resolve('./entry')]
    entry = require('./entry')
    expect(entry.getEntrys().length).to.eq(0, 'entry module could not be reset correctly')
  }

  beforeEach(reset)
  after(reset)

  it('#getEntrys() initially returns empty array', function () {
    expect(entry.getEntrys()).to.deep.eq([])
  })

  describe('#createEntry()', function () {
    it('createEntry returns stored new Entry', function () {
      const dummyMsg = `Hi there ${Math.random}`
      const time = Date.now()
      const returnVal = entry.createEntry({
        message: dummyMsg
      })
      expect(returnVal)
        .to.be.an('object')
        .to.haveOwnProperty('created')
      expect(returnVal.message).to.eq(dummyMsg)
      expect(returnVal.userId).to.eq(1)
      expect(returnVal.edited).to.eq(undefined, '"edited" should not undefined for new Entries')
      expect(returnVal.id).to.eq(1)
      expect(returnVal.created).to.be.at.least(time)
    })

    it('stored new Entry can be read by #getEntrys()', function () {
      const createdEntry = entry.createEntry({
        message: 'Test Message'
      })
      expect(entry.getEntrys().length).to.eq(1)
      expect(entry.getEntrys()[0]).to.deep.eq(createdEntry)
    })
  })

  describe('#updateEntry()', function () {
    it('returns updated Entry', function () {
      const dummyMsg = `Initial message ${Math.random}`
      const initialEntry = entry.createEntry({
        message: dummyMsg
      })
      const modidifiedMessage = `Modified Message ${Math.random}`
      const time = Date.now()
      const updatedEntry = entry.updateEntry(initialEntry.id, {
        message: modidifiedMessage
      })
      expect(updatedEntry !== initialEntry, 'updatedEntry should be a new reference').to.eq(true)
      expect(updatedEntry.message).to.eq(modidifiedMessage)
      expect(updatedEntry.edited).to.be.at.least(time)
      expect(updatedEntry.id).to.eq(initialEntry.id)
      expect(updatedEntry.created).to.eq(initialEntry.created)
      expect(updatedEntry.userId).to.eq(initialEntry.userId)
      expect(updatedEntry.created).to.eq(initialEntry.created)
    })

    it('updated Entry can be read by #getEntrys()', function () {
      const initialEntry = entry.createEntry({
        message: `Test Message ${Math.random}`
      })
      const updatedEntry = entry.updateEntry(initialEntry.id, {
        message: `Modified Message ${Math.random}`
      })
      expect(entry.getEntrys().length).to.eq(1)
      expect(entry.getEntrys()[0]).to.deep.eq(updatedEntry)
    })

    it('returns "null" if entry cannot be found', function () {
      const updatedEntry = entry.updateEntry(99999, {
        message: `sdfsd`
      })
      expect(updatedEntry).to.eq(null)
    })
  })

  describe('#deleteEntry()', function () {
    it('can delete Entry', function () {
      const deletedVal = entry.createEntry({
        message: 'Test Message'
      })
      expect(entry.getEntrys().length).to.eq(1)
      expect(entry.deleteEntry(deletedVal.id)).to.deep.eq(deletedVal)
      expect(entry.getEntrys().length).to.eq(0)
    })

    it('returns "null" if entry cannot be found', function () {
      const deletedVal = entry.deleteEntry(99999, {
        message: `sdfsd`
      })
      expect(deletedVal).to.eq(null)
    })
  })
})
