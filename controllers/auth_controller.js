const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getCollection } = require('../db/conn');
const { secret } = require('../config/auth.config');

const collection = 'users';

const register = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await getCollection(collection).insertOne({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });
    console.log('User successfully registered', user.insertedId);
    res
      .status(201)
      .json({ message: `A user was created with the id: ${user.insertedId}` });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getCollection(collection).findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: '30s',
      });

      // const otherUsers = await getCollection(collection).filter(
      //   (person) => person.username != user.username
      // );
      // const currentUser = { ...user, token };

      const currentUser = await getCollection(collection).updateOne(
        { username: user.username },
        { $set: { token: token } },
        { upsert: false }
      );
      console.log(currentUser);
      res.json({
        id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken: token,
      });
    } else {
      res.status(401).send('Invalid password!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
};

module.exports = { register, login };
