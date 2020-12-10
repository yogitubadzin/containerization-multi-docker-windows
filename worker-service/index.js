const { redisClient, redisPublisher } = require('./logic/redisClient');
const { calculateMathPower } = require('./logic/mathPowerCalculator');

redisPublisher.on('message', (channel, message) => {
  redisClient.hset('mathPowerNumbers', message, calculateMathPower(parseInt(message)));

  // LOG
  redisClient.hgetall('mathPowerNumbers', (err, mathPowerNumbers) => {
    console.log('Check status for redis after insert:' + mathPowerNumbers);
  });
  // END LOG
});

redisPublisher.subscribe('insert');