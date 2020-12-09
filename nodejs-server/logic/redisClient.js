const configuration = require('./configuration');

const redis = require('redis');
const redisClient = redis.createClient({
  host: configuration.redisHost,
  port: configuration.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

exports.redisClient = redisClient;
exports.redisPublisher = redisPublisher;