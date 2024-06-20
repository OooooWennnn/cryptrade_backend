const { getCollection } = require('../db/conn');

async function checkDuplicateUsernameOrEmail(req, res, next) {
  const Users = await getCollection('users');
  try {
    const userByUsername = await Users.findOne({ username: req.body.username });
    if (userByUsername) {
      return res.status(400).send({ message: 'Username is already in use!' });
    }

    const userByEmail = await Users.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).send({ message: 'Email is already in use!' });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = {
  checkDuplicateUsernameOrEmail,
};
