const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const controllers = require('./controllers');
const config = require('./config/config');

const app = express();

// Set middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set API endpoints
controllers.set(app);
app.get('/ping', (req, res) => res.status(200).send('pong'));

// Listen
const httpServer = http.createServer(app);
httpServer.listen(config.port, () => {
  console.log(`App listening on port ${config.port}!`);
});
