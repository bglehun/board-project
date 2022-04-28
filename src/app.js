var express = require('express');
var app = express();

const config = require('./env')
const { sequelize } = require('./libs/sequelize');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

require('./router')(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.stack });
});

sequelize.sync().then(() => console.log('success sequelize sync!')).catch(e => e);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})