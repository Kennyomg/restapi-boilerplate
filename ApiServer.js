const fs = require('fs'); // eslint-disable-line
const http = require('http');
const https = require('https');
const compression = require('compression');
const bodyParser = require('body-parser');
const headersMiddleware = require('./middleware/headers');
const loggingMiddleware = require('./middleware/logging');
const authMiddleware = require('./middleware/auth');
const errorsMiddleware = require('./middleware/errors');
const db = require('./models');
const router = require('./routes');
const status = require('./constants/status');

module.exports = class ApiServer {

  constructor(app) {
    this._app = app;
    this._database = db;
    this._app.locals.sequelize = db.sequelize;
    this.init();
  }

  get app() {
    return this._app;
  }

  get database() {
    return this._database;
  }

  init() {
    this.middleware();
    this.addRoutes();
  }

  middleware() {
    this._app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    this._app.use(compression());
    this._app.use(loggingMiddleware());
    this._app.use(headersMiddleware());

    // Add calls to bypass authorization. If you don't have auth then disactivate this code
    this._app.use(authMiddleware({
      bypass: ['/v1/ping'],
    }));
    // --
    
    this._app.use((req, res, next) => {
      if (!req.secure && process.env.NODE_ENV !== 'development') {
        return next(status.httpVersionNotSupported);
      }
      return next();
    });
    this._app.use(errorsMiddleware());
  }

  addRoutes() {
    this._app.use('/v1', router);
    this._app.all('*', (req, res) => {
      res.status(404).json(status.pathNotFound);
    });
  }

  startHttp(port) {
    http.createServer(this._app).listen(port, () => {
      console.log('http server running on port', port); // eslint-disable-line
    });
  }

  startHttps(port, sslKey, sslCert) {
    const ssl = {
      key: fs.readFileSync(sslKey, { encoding: 'utf8' }),
      cert: fs.readFileSync(sslCert, { encoding: 'utf8' }),
    };

    https.createServer(ssl, this._app).listen(port, () => {
      console.log('https server running on port', port); // eslint-disable-line
    });
  }
};
