const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();

// User Routes
router.post('/register', userController.createUser);
router.post('/login', userController.userLogin);
router.get('', userController.getUsers);
router.get('/:id', userController.getSingleUser);

module.exports = router;
