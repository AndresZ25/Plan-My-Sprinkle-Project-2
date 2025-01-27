const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next(); 
    } else {
      res.status(401).json({ message: 'You must be logged in to access this page' });
    }
  };
  
  const isAdmin = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
      return next(); 
    } else {
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  };



  module.exports = isAuthenticated;