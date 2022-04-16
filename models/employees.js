const knex = require('../db/knex');
const EMPLOYEE_TABLE = 'employees';

const findUserByUsername = async(username)=>{
    const query = knex(EMPLOYEE_TABLE).where({username});
    const result = await query;
    return result;
}
const getAllUser = async()=>{
    const query = knex(EMPLOYEE_TABLE);
    const result = await query;
    return result;
}

module.exports = {
    findUserByUsername, getAllUser
};