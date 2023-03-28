const adminMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden', message:'You don’t have permission to perform this action ' });
    }
  }


  module.exports=adminMiddleware 