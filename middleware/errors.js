const _ = require('lodash'); // eslint-disable-line
const fs = require('fs');
const path = require('path');
const status = require('../constants/status');

module.exports = () => (reason, req, res, next) => { // eslint-disable-line
  // Self made error
  let stack = {};
  console.log(reason);
  if (_.has(reason, 'status') &&
     _.has(reason, 'code') &&
     _.has(reason, 'message')) {
    if (_.has(reason, 'log') && reason.log) {
      console.log(reason, reason.log.stack); // eslint-disable-line
      stack = reason.log.stack;
      delete reason.log; // eslint-disable-line
    }
    res.status(reason.status).json(reason);
  } else {
    // Default error
    console.error('Error', reason, reason.stack); // eslint-disable-line
    stack = reason.stack;
    res.status(500).json(status.serverError);
  }

  fs.appendFile(path.resolve(__dirname, '../logs/error.log'), `${reason}\n${stack}\n\n`);
};
