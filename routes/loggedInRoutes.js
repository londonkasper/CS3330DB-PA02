const express = require('express');
const User = require('../models/users');
const UserController = require('../controllers/users');

const router = express.Router();

router.get('/session', (req, res, next) => {
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
});



module.exports = router;