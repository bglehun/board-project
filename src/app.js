var express = require('express');
var app = express();
const config = require('./env')
const { swaggerUi, specs } = require('./swagger');

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

const { initialize } = require('./libs/sequelize');

initialize({ force: false })
.then(() => {
  require('./router')(app);
})
.catch(e => console.log(e));


app.get('/', function(req, res) {
  res.send('hello world');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.stack });
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})