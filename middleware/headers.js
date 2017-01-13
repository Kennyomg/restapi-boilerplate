const _ = require('lodash'); // eslint-disable-line
const status = require('../constants/status');

module.exports = () => (req, res, next) => {
  // Remove X-powered-by
  res._headers = {}; // eslint-disable-line

  // Disable caching
  res.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.append('Pragma', 'no-cache');
  res.append('Expires', '0');

  if (!~_.indexOf(['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], req.method)) {
    return next(status.invalidMethod);
  }

  res.header('Access-Control-Allow-Origin', req.get('origin'));
  res.header('Access-Control-Allow-Headers', 'accept, authorization, method, content-type');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, authorization, method, x-file-name, content-type');
    return res.end();
  }

  return next();
};
