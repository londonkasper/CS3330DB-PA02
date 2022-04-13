const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Student = require('../models/students');

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

module.exports = {
    authenticateEmployee
};