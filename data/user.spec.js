const user = require('./user')
const { expect } = require('chai')

describe('User State', function () {
  it('Ensure default userId exists', function () {
    expect(user.getDefaultUserId()).to.eq(user.getUser(user.getDefaultUserId()).id)
  })

  it('Ensure default userId exists and has right properties', function () {
    const defaultUser = user.getUser(user.getDefaultUserId())

    expect(defaultUser).to.haveOwnProperty('id')
    expect(defaultUser).to.haveOwnProperty('surname')
    expect(defaultUser).to.haveOwnProperty('name')
  })
})
