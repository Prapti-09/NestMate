const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No authentication token, access denied' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ message: 'Token verification failed, authorization denied' });

    req.user = verified.id;
    req.role = verified.role;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const adminOnly = (req, res, next) => {
  if (req.role !== 'institute_admin' && req.role !== 'platform_admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { auth, adminOnly };
