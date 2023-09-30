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
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
    it('avoid creating an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov',
      };
    
      // First, create the user to simulate an existing user
      userController.create(user, (createErr, createResult) => {
        expect(createErr).to.be.equal(null);
        expect(createResult).to.be.equal('OK');
    
        // Attempt to create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(err.message).to.be.equal('User already exists'); // Check the error message
          expect(result).to.be.equal(null);
          done();
        });
      });
    });
  })

  // TODO Create test for the get method
  describe('Get', () => {
    it('get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov',
      };

      // Create the user first
      userController.create(user, (createErr, createResult) => {
        expect(createErr).to.be.equal(null);
        expect(createResult).to.be.equal('OK');

        // Attempt to get the user by username
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.deep.equal(user);
          done();
        });
      });
    });

    it('cannot get a user when it does not exist', (done) => {
      const nonExistingUsername = 'nonexistentuser';

      // Attempt to get a user that does not exist
      userController.get(nonExistingUsername, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
})
})