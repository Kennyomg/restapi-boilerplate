const fs = require('fs'); // eslint-disable-line
const db = require('../models');
const path = require('path');
const status = require('../constants/status');

module.exports = (options) => {
  const bypass = options.bypass || [];

  return (req, res, next) => {
    for (let i = 0; i < bypass.length; i++) {
      if (new RegExp(`^${bypass[i]}`).test(req.path)) {
        return next();
      }
    }

    let auth = req.headers.authorization;

    if (!auth) return next(status.unauthorized);

    auth = auth.replace('Basic ', '');
    auth = new Buffer(auth, 'base64').toString('ascii');

    return db.User.findOne({ where: { api_key: auth } }).then(user => {
      if (!user) {
        console.log('Invalid api key', auth); // eslint-disable-line
        return next(status.invalidApiKey);
      }

      res.header('Access-Control-Allow-Origin', req.get('origin'));

      fs.appendFile(
        path.resolve(__dirname, `../logs/api/${auth}.log`),
        `${
          new Date().toGMTString()
        } ${
          req.ip
        } ${
          req.method
        } ${
          req.path
        } ${
          JSON.stringify(req.query)
        } ${
          JSON.stringify(req.body)
        }\n`
      );

      res.locals.user = user; // eslint-disable-line
      return next();
    }).catch(next);
  };
};
