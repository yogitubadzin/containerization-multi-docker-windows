const { app } = require('./logic/app');
const { postgressClient } = require('./logic/postgressClient');
const { redisClient, redisPublisher } = require('./logic/redisClient');

app.get('/numbers/all', async (req, res) => {
  const values = await postgressClient.query('SELECT * from mathPowerNumbers');

  res.send(values.rows);
});

app.get('/numbers/all-with-calculations', async (req, res) => {
  redisClient.hgetall('mathPowerNumbers', (err, mathPowerNumbers) => {
    res.send(mathPowerNumbers);
  });
});

app.post('/numbers', async (req, res) => {
  const number = req.body.number;

  if (parseInt(number) > 100) {
    return res.status(422).send('Number for calculating too high');
  }

  redisPublisher.publish('insert', number);
  postgressClient.query('INSERT INTO mathPowerNumbers(number) VALUES($1)', [number]);

  // LOG
  var result = postgressClient.query('SELECT * from mathPowerNumbers');
  console.log('Check status for postgress:' + result);
  // END LOG

  res.send({ working: true });
});

app.listen(2000, err => {
  console.log('Listening');
});