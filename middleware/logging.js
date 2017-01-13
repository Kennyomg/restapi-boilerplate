module.exports = () => (req, res, next) => { // eslint-disable-line
  console.log(req.method, req.get('origin'), req.ip, req.path); // eslint-disable-line
  next();
};
