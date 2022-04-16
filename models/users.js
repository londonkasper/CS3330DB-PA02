const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const USER_TABLE = 'employee';
const VEHICLE_TABLE = 'vehicle';
const ALLOCATION_TABLE = 'allocation';

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

const createNewAllocation = async(license_plate, spot_number, lot_id, type, is_handicap, arrival_time, departure_time, employee )=>{//include more information for vehicle?
    const vehicle = await findVehicleByLicensePlate(license_plate);
    if(vehicle.length === 0){ // If the vehicle's license plate isn't already found in the vehicle table, it needs to be added
        const query = knex(VEHICLE_TABLE).insert({license_plate: license_plate, type:type, is_handicap:is_handicap});
        
        const result = await query;
        return result;
//need to add vehicle to table here if not found
    }//continue as if vehicle already in table now
    const makeAlloc = knex(ALLOCATION_TABLE).insert({license_plate:license_plate, spot_number:spot_number, lot_id:lot_id, arrival_time:arrival_time, departure_time:departure_time, employee:employee  })
    console.log(`Raw query for createNewAllocation: `, makeAlloc.toString());
    const result2 = await makeAlloc;
    return result2;
};

const findUserByUsername = async (username) => {
    const query = knex(USER_TABLE).where({ username});
    const result = await query;
    return result;
};
const findVehicleByLicensePlate = async(license_plate)=>{
    const query1 = knex(VEHICLE_TABLE).where({license_plate});
    const result = await query1;
    return result;
    // const query = knex(VEHICLE_TABLE).where({license_plate});
    // const exists = await query;
    // if(exists.length === 0){
    //     console.log(`No vehicles in table with the license plate: ${license_plate}`);
    //     return null;
    // }
    // const vehicle = exists[0];
    // return vehicle;
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
    authenticateUser,
    createNewAllocation,
    findVehicleByLicensePlate,
    getAllUser
};