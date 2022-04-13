const knex = require('../db/knex');
const EMPLOYEE_TABLE = 'employees';

const findUserByEmail = async(email)=>{
    const query = knex(EMPLOYEE_TABLE).where({email});
    const result = await query;
    return result;
}

module.exports = {
    findUserByEmail
};