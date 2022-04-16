const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const USER_TABLE = 'employee';

const createNewUser = async (username, password, first_name, last_name, ssn, lot_assignment ) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);
    const query = knex(USER_TABLE).insert({ username: username, password: hashedPassword, first_name: first_name, last_name:last_name, ssn: ssn, lot_assignment: lot_assignment }); // username, 
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;
    return result;
};


const findUserByUsername = async (username) => {
    const query = knex(USER_TABLE).where({ username});
    const result = await query;
    return result;
}

const authenticateUser = async (username, password) => {
    const users = await findUserByUsername(username);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the username: ${username}`);
        return null;
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        delete user.password;
        return user;
    }
    return null;
}
const getAllUser = async()=>{
    const query = knex(EMPLOYEE_TABLE);
    const result = await query;
    return result;
}

module.exports = {
    createNewUser,
    findUserByUsername,
    authenticateUser
};