const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })
  
  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'gabrieltrier',
        firstname: 'Gabriel',
        lastname: 'Trier'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Gabriel',
        lastname: 'Trier'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'gabrieltrier',
        firstname: 'Gabriel',
        lastname: 'Trier'
      }
      // Create a user
      userController.create(user, () => {
        // Create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
    })
  })

  describe('Get', ()=> {

    it('get a user by username', (done) => {
      const user = {
        username: 'gabrieltrier',
        firstname: 'Gabriel',
        lastname: 'Trier'
      }
      // Create a user
      userController.create(user, () => {
        // Get an existing user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.deep.equal({
            firstname: 'Gabriel',
            lastname: 'Trier'
          })
          done()
        })
      })
    })
  
    it('can not get a user when it does not exist', (done) => {
      userController.get('invalid', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  
  })
  describe('Delete', () => {
    it('delete an existing user', (done) => {
      const user = {
        username: 'gabrieltrier',
        firstname: 'Gabriel',
        lastname: 'Trier'
      };
      // Create a user
      userController.create(user, () => {
        // Delete the existing user
        userController.delete(user.username, (err, result) => {
          expect(err).to.be.null
          expect(result).to.equal(1)
          done()
        })
      })
    })
    it('try to delete a non-existing user', (done) => {
      userController.delete('nonExistentUser', (err, result) => {
        expect(err).to.not.be.null
        expect(result).to.be.null
        expect(err.message).to.equal('User not found')
        done()
      })
    })
  })
})
