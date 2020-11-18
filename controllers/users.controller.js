const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

// Register a User in the DB
exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Invalid Credentials!'
      });
    });
  });
};

// Authenticate a User in the DB
exports.userLogin = (req, res) => {
  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth Failed!'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth Failed!'
      });
    }
    const token = jwt.sign({
      email: fetchedUser.email, 
      userId: fetchedUser._id
    }, 
    'secret_this_should_be_long_string',
    {
      expiresIn: '1h'
    });
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(error => {
    return res.status(401).json({
      message: 'Invalid Credentials!'
    });
  })
};

// Get all Users
exports.getUsers = (req, res) => {
  User.find().then(getUsers => {
    if (getUsers)
      res.status(200).json({
        message: 'Users fetched successfully',
        getUsers: getUsers
      });
    else
      res.status(404).json({ message: 'Users not found.' });
  })
  .catch(error => {
    res.status(500).json({ message: 'Cannot fetch all users.' });
  });
};

// Get single User
exports.getSingleUser = (req, res) => {
  User.findById(req.params.id)
  .then(getUser => {
    if (getUser)
      res.status(200).json(getUser);
    else
      res.status(404).json({ message: 'User not found.' });
  })
  .catch(error => {
    res.status(500).json({ message: 'Cannot fetch user.' });
  });
};