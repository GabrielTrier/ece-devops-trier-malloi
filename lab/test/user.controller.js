const { expect } = require("chai");
const userController = require("../src/controllers/user");
const db = require("../src/dbClient");

describe("User", () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  describe("Create", () => {
    it("create a new user", (done) => {
      const user = {
        username: "sergkudinov",
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
        done();
      });
    });

    it("passing wrong user parameters", (done) => {
      const user = {
        firstname: "Sergei",
        lastname: "Kudinov",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    // it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
    //   done()
    // })
    it("avoid creating an existing user", (done) => {
      // 1. First, create a user to make this unit test independent from the others
      const existingUser = {
        username: "paulolo",
        firstname: "paul",
        lastname: "malloi",
      };

      // Create a user
      userController.create(existingUser, () => {
        // Try to create the same user again
        userController.create(existingUser, (err, result) => {
          // Check if the result indicates that the user already exists
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });
  });

  // TODO Create test for the get method
  describe("Get", () => {
    it("get a user by username", (done) => {
      // 1. First, create a user to make this unit test independent from the others
      const userToCreate = {
        username: "paulolo",
        firstname: "paul",
        lastname: "malloi",
      };

      userController.create(userToCreate, () => {
        // 2. Then, check if the result of the get method is correct
        userController.get(userToCreate.username, (err, result) => {
          expect(err).to.be.equal(null);
          // Assuming getResult should be an object with specific user information
          expect(result).to.be.deep.equal({
            firstname: "paul",
            lastname: "malloi",
          });

          done();
        });
      });
    });

    it("cannot get a user when it does not exist", (done) => {
      // Chech with any invalid user
      userController.get('invalid',(err,result)=>{
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
      })
      done();
    });
  });
});
