const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      console.log(token)
      return res.status(401).json({ error: 'Authorization token not found' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    if(!decoded) {
      return res.status(403).json({ error: 'expired token' });
    }
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(400).json({ error: 'Access forbidden: Admin authorization required' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = { requireAdmin };