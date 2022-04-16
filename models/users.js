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

const createNewAllocation = async(license_plate, spot_number, lot_id, type, is_handicap, arrival_time, departure_time, employee )=>{
    const vehicle = await findVehicleByLicensePlate(license_plate);
    if(vehicle.length === 0){ 
        const query = knex(VEHICLE_TABLE).insert({license_plate: license_plate, type:type, is_handicap:is_handicap});
        const result = await query;
        console.log('Result of adding vehicle: ', result.toString);
    }
    const makeAlloc = knex(ALLOCATION_TABLE).insert({license_plate:license_plate, spot_number:spot_number, lot_id:lot_id, arrival_time:arrival_time, departure_time:departure_time, employee:employee  })
    console.log(`Raw query for createNewAllocation: `, makeAlloc.toString());
    const result2 = await makeAlloc;
    return result2;
};

const changeAllocation = async(body, id)=>{
    const vehicle = await findVehicleByLicensePlate(body.license_plate);
    if(vehicle.length === 0 ){
        const query = knex(VEHICLE_TABLE).insert({license_plate: body.license_plate, type:body.type, is_handicap:body.is_handicap});
        const result = await query;
        console.log('Result of adding vehicle: ', result.toString);
    }
    const changeAlloc = knex(ALLOCATION_TABLE).where({allocation_num : id}).update({license_plate : body.license_plate});
    console.log(`Raw query for changeAllocation: `, changeAlloc.toString());
    const result2 = await changeAlloc;
    return result2;
};


const deleteAllocation = async(id)=>{
    const allocation = knex(ALLOCATION_TABLE).where({allocation_num : id}).del();
    console.log(`Raw query for deleteAllocation: `, deleteAllocation.toString());
    const result = await allocation;
    return result;
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
};

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
};

const getAllUser = async()=>{
    const query = knex(EMPLOYEE_TABLE);
    const result = await query;
    return result;
};

const getSpots = async(stadium, lot, available)=>{
    const query = knex(PARKING_SPOT_TABLE)
        .modify(function(joinquery) {
            if(stadium){
                joinquery.join('lot', 'parking_spot.lot_id', '=', 'lot.id');
            }
        })
        .where((builder) => {
            if (lot) {
                builder.where('lot_id', lot)
            }
        })
        .where((builder) => {
            if (available) {
                builder.where('is_available', available)
            }
        })


    //const query = knex(PARKING_SPOT_TABLE)
    //const query = knex(PARKING_SPOT_TABLE).join('lot', 'parking_spot.lot_id', '=', 'lot.id').where({lot_id:lot, is_available:available,stadium_id:stadium});;
    const result = await query;
    return result;
};

module.exports = {
    createNewUser,
    findUserByUsername,
    authenticateUser,
    createNewAllocation,
    changeAllocation,
    deleteAllocation,
    findVehicleByLicensePlate,
    getAllUser,
    getSpots
};