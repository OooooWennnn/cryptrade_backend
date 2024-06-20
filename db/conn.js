const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

var _db;

async function connectToServer() {
  let response = { connected: false, message: "" };
  try {
    await client.connect();
    _db = client.db("cryptrade");
    response.connected = true;
    response.message = "Successfully connected to MongoDb";
  } catch (error) {
    response.message = "Failed to connect to MongoDB";
    console.error(error);
  }
  console.log(response.message);
  return response;
}

function getDB() {
  if (!_db) throw new Error("Database connection is not established.");

  return _db;
}

function getCollection(collectionName = "users") {
  const db = getDB();
  return db.collection(collectionName);
}

module.exports = { connectToServer, getDB, getCollection };
