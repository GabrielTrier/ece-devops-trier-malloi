const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('GET /user', () => {
    // New test: successfully get user
    it('successfully get user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov',
      };

      // Create the user first
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body.status).to.equal('success');
          chai.expect(res).to.be.json;

          // Now, make a GET request to retrieve the user
          chai.request(app)
            .get(`/user/${user.username}`)
            .then((getRes) => {
              chai.expect(getRes).to.have.status(200);
              chai.expect(getRes.body.status).to.equal('success');
              chai.expect(getRes.body.user).to.deep.equal(user);
              done();
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    });

    // New test: cannot get a user when it does not exist
    it('cannot get a user when it does not exist', function (done) {
  // Set a longer timeout, for example, 5000ms (5 seconds)
  this.timeout(10000);

  const nonExistingUsername = 'nonexistentuser';
  // Make a GET request for a non-existing user
  chai.request(app)
    .get(`/user/${nonExistingUsername}`)
    .then((getRes) => {
      chai.expect(getRes).to.have.status(404);
      chai.expect(getRes.body.status).to.equal('error');
      chai.expect(getRes.body.msg).to.equal('User not found');
      done();
    })
    .catch((err) => {
      throw err;
    });
});

    
  });
})
