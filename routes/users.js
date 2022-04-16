const express = require('express');
const User = require('../models/users');
const UserController = require('../controllers/users');

const router = express.Router();

router.get('/current', async (req, res, next) => {
    try {
        const user = req.user;
        const result = await User.findUserByUsername(user.username);//const result = await UserController.authenticateEmployee(body.username, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current user:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }
});
router.get('/all', async(req, res, next) =>{
    try {
        const result = await User.getAllUser();
        res.status(201).json(result);

    }catch(err){
        console.error('Failed to load all users:', err);
        res.sendStatus(500).json({message:err.toString()});
    }

});

router.post('/account', async (req, res, next) => {
    try {
        const body = req.body;
        console.log("This is a flag");
        console.log(body);
        const result = await User.createNewUser(body.username, body.password, body.first_name, body.last_name, body.ssn, body.lot_assignment );
        res.status(201).json(result);
    } catch (err) {
        console.error('>Failed to create new user:', err);
        res.status(400).json({ message: err.toString() });
    }
    next();
})

module.exports = router;