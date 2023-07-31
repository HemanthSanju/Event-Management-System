const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { FirstName, LastName, PhoneNumber, email, username, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email, username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const user = await User.create({ FirstName, LastName, PhoneNumber, email, username, password, isAdmin });
    res.status(201).json({
      status: 'Created',
      message: 'User registered successfully',
      data: [user]
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const name = user.FirstName + ' '+ user.LastName
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin, name: name, phoneNumber: user.PhoneNumber }, process.env.SECRET_KEY, { expiresIn: '1d' });
    
    let respObj = {
      token: token,
      isAdmin: user.isAdmin,
      name: name,
      id: user._id,
      phoneNumber: user.PhoneNumber
    }
    res.status(200).send({ 
      status: 'OK',
      message: 'logged in sucessfully',
      data: [respObj]
     });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.clearCookie('connect.sid'); 
      res.json({ status: 'Success', message: 'Logout successful' });
    }
  });
};
