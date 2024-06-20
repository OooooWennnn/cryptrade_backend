const { getCollection } = require('../db/conn');

const Users = getCollection('users');

async function checkToken(req, res, next) {}
