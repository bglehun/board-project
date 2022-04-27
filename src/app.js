var express = require('express');
var app = express();

const config = require('./env')
const { sequelize } = require('./libs/sequelize');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

require('./router')(app);

sequelize.sync().then(() => console.log('success sequelize sync!')).catch(e => e);

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})