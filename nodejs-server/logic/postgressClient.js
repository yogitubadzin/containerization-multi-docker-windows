const configuration = require('./configuration');

const { Pool } = require('pg');
const postgressClient = new Pool({
  user: configuration.postgressUser,
  host: configuration.postgressHost,
  database: configuration.postgressDatabase,
  password: configuration.postgressPassword,
  port: configuration.postgressPort
});

postgressClient.on('error', () => console.log('Lost postgress connection'));

postgressClient
  .query('CREATE TABLE IF NOT EXISTS mathPowerNumbers (number INT)')
  .catch(err => console.log(err));

exports.postgressClient = postgressClient;