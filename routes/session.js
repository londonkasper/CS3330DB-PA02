const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;

        const result = await UserController.authenticateEmployee(body.username, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(401).json({ message: err.toString() });
    }

    next();
})

// router.get('/session', async(req, res, next)=>{

//     const body = req.body;


// })
module.exports = router;