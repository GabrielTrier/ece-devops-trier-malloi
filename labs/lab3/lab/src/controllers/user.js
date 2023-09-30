const db = require('../dbClient');

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username) {
      return callback(new Error('Wrong user parameters'), null);
    }
    db.hexists(user.username, 'username', (existsErr, existsResult) => {
      if (existsErr) return callback(existsErr, null);

      if (existsResult === 1) {
        // User with the same username already exists
        return callback(new Error('User already exists'), null);
      }
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
    };
    // Save to DB
    // TODO check if user already exists

    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null);
      callback(null, res); // Return callback
    });
  });
  },

  get: (username, callback) => {
    // Use Redis hgetall to retrieve user data by username
    db.hgetall(username, (err, user) => {
      if (err) return callback(err, null);
      if (!user) {
        return callback(new Error('User not found'), null);
      }
      // Convert user data to a proper object
      const userData = {
        username: username,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      callback(null, userData);
    });
  },
};
