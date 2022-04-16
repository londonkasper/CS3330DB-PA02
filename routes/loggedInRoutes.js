const express = require('express');
const User = require('../models/users');
const UserController = require('../controllers/users');

const router = express.Router();

router.get('/session', (req, res, next) => { // Authenticate user using session logic
    try {
        res.status(200).json({
            message: 'User authenticated',
            user: req.user
        });
    } catch (error) {
       res.status(500).json({
           message: 'Something went wrong'
       });
    }
    next();
});

router.get('/all', async(req, res, next) =>{ //Get all users
    try {
        const result = await User.getAllUser();
        res.status(201).json(result);

    }catch(err){
        console.error('Failed to load all users:', err);
        res.sendStatus(500).json({message:err.toString()});
    }

});

router.post('/allocation', async(req, res, next)=>{ // Post a new allocation for a parking spot
    try{
        const body = req.body;
        const employee = req.user.ssn;
        console.log("Posting a new allocation");
        console.log(body);
        const result = await User.createNewAllocation(body.license_plate, body.spot_number, body.lot_id, body.type, body.is_handicap, body.arrival_time, body.departure_time, employee );
        res.status(201).json(result);
    }
    catch(err){
        console.error('Failed to create new allocation:', err);
        res.status(400).json({message:err.toString()});
    }
    next();
});

router.put('/allocation/:allocation_id', async(req, res, next)=>{ // Update an existing allocation's vehicle data
    try{
        //const employee = req.user.ssn;
        const info = req.body;
        const id = req.params.allocation_id;
        console.log("Making changes to allocation # : ", id.toString);
        const result = await User.changeAllocation(info, id);
        console.log("");
        res.status(200).json(result);
    }
    catch(err){
        console.error('Failed to edit allocation: ', err);
        res.status(400).json({message:err.toString()});
    }
    next();
});

router.delete('/allocation/:allocation_id', async(req, res, next)=>{
    try{
        const id = req.params.allocation_id;
        console.log("Deleting allocation with number: ", id.toString);
        const result = await User.deleteAllocation(id);
        res.status(204).json(result);
    }
    catch(err){
        console.error('Failed to delete allocation: ', err);
        res.status(400).json({message:err.toString()});
    }
    next();

});



module.exports = router;