module.exports = (req, res, next) => {
  if (user?.role == 'admin') {
    return next();
  }

  res.status(403).redirect('/');
};
