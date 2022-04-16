const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Employee  = require('../models/employees');

const accessTokenSecret = 'JeremyFarted';

const authenticateEmployee = async (username, password) => {
    const user = await User.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const employees = await Employees.findUserByUsername(username);
    console.log('Employees', employees);
    const accessToken = jwt.sign({ ...employees[0], claims: ['employee'] }, accessTokenSecret);

    return accessToken;

}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
    return res.sendStatus(401);
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
        return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateEmployee, authenticateJWT
};