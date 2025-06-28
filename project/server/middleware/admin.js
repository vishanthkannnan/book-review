import User from '../models/User.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    // For now, we'll check by email since we removed JWT
    // In a real app, you'd get user from JWT token
    const userEmail = req.body.email || req.query.email || req.headers['user-email'];
    
    if (!userEmail) {
      return res.status(401).json({ message: 'Admin access required' });
    }

    const user = await User.findOne({ email: userEmail });
    
    if (!user || !user.isAdmin()) {
      return res.status(403).json({ message: 'Admin access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 