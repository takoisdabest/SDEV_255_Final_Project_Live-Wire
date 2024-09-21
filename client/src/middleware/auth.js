const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secret');
    const user = await Teacher.findById(decoded.id) || await Student.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const roleAuth = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send('Access denied');
  }
  next();
};

module.exports = { auth, roleAuth };