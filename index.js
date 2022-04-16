const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const cors = require ('cors');

const usersRoutes = require('./routes/users');
const sessionRoutes = require('./routes/session');
const loggedInRoutes = require('./routes/loggedInRoutes');

const { authenticateJWT, authenticateWithClaims } = require('./middleware/auth');

const app = express();
const port = 3000;
const config = {
    name: 'Project2',
    port: 3000,
    host: '0.0.0.0',
  };

app.use(bodyParser.json());


app.get('/health', (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    console.log(`Welcome to the health branch.`);
    // next() is how we tell express to continue through the middleware chain
    next();
});

app.use('/session', sessionRoutes);
app.use('/user',  usersRoutes);
app.use('/', authenticateJWT, loggedInRoutes);
 //authenticateJWT,

app.listen(config.port, config.host, (e) => {
    if (e) {
      throw new Error('Internal Server Error');
    }
    console.log(`This app is listening on port ${port}`);
    //logger.info(`${config.name} running on ${config.host}:${config.port}`);
  });
