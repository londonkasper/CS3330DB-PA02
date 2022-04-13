const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const sessionRoutes = require('./routes/session');

const { authenticateJWT, authenticateWithClaims } = require('./middleware/auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/health', (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    // next() is how we tell express to continue through the middleware chain
    next();
});

app.use('/session', sessionRoutes);
app.use('/employees', authenticateJWT, usersRoutes);

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});