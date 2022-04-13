const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Student = require('../models/students');

const accessTokenSecret = 'JeremyFarted';

const authenticateEmployee = async (email, password) => {
    const user = await User.authenticateUser(email, password);
    if (user === null) {
        return user;
    }
    const employees = await Employees.findUserByEmail(email);
    console.log('Employees', employees);
    const accessToken = jwt.sign({ ...employees[0], claims: ['employee'] }, accessTokenSecret);

    return accessToken;

}

module.exports = {
    authenticateEmployee
};