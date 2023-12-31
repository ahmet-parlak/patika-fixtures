exports.getIndexPage = (req, res) => {
  const currentPage = 'index';
  res.status(200).render('index', { currentPage });
};
exports.getAboutPage = (req, res) => {
  const currentPage = 'about';
  res.status(200).render('about', { currentPage });
};
exports.getFurnituresPage = (req, res) => {
  const currentPage = 'furnitures';
  res.status(200).render('furnitures', { currentPage });
};
exports.getContactPage = (req, res) => {
  const currentPage = 'contact';
  res.status(200).render('contact', { currentPage });
};
exports.getLoginPage = (req, res) => {
  const currentPage = 'login';
  res.status(200).render('login', { currentPage });
};
