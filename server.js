process.env.NODE_ENV = 'development'; // eslint-disable-line
process.env.NODE_PATH = __dirname;

for (const [index, value] of process.argv.entries()) { // eslint-disable-line
  if (['production', 'development', 'test'].find(x => x === value.replace('--', ''))) {
    process.env.NODE_ENV = value.replace('--', '');
  }
}

const fs = require('fs');
const express = require('express');
const app = express();
const config = require('./config');
const ApiServer = require('./ApiServer');
const server = new ApiServer(app);
const db = require('./models');

db.sequelize.sync(/* { force: true } */).then(() => {
  console.log('Database up and running'); // eslint-disable-line
  server.startHttp(config.apiserver.http_port);
  if (process.env.NODE_ENV === 'production') {
    server.startHttps(config.apiserver.https_port, config.apiserver.ssl_key, config.apiserver.ssl_cert);
  }
});

process.on('uncaughtException', (error) => {
  console.log('Caught exception:', error, error.stack); // eslint-disable-line
  fs.appendFile('./logs/error.log', `${error}\n${error.stack}\n\n`);
});
