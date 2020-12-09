const { redisClient, redisPublisher } = require('./logic/redisClient');
const { calculateMathPower } = require('./logic/mathPowerCalculator');

redisPublisher.on('message', (channel, message) => {
  console.log('Check status for redis before insert:');
  console.log(message);

  redisClient.hset('mathPowerValues', message, calculateMathPower(parseInt(message)));

  redisClient.hgetall('mathPowerNumbers', (err, mathPowerNumbers) => {
    console.log('Check status for redis after insert:');
    console.log(mathPowerNumbers);
  });
});

redisPublisher.subscribe('insert');