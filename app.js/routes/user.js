const express = require('express');

const userController = require('../controllers/user');


const {verify} = require('../../auth');

const router = express.Router();





// user registration
router.post('/register', userController.registerUser);

// login user
router.post('/login', userController.loginUser);



module.exports = router;