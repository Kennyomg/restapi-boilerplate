module.exports = {
  production: {
    environment: {
      path: 'https://api.example.com',
      domain: 'api.example.com'
    },

    apiserver: {
      http_port: 80,
      https_port: 443,
      ssl_key: '/path/to/ssl.key',
      ssl_cert: '/path/to/ssl.cert'
    },

    db: {
      host: 'localhost',
      port: '3306',
      username: 'USERNAME',
      password: 'PASSWORD',
      database: 'example_production',
      dialect: 'mysql'
    },

    logging: false,
  },
  development: {
    environment: {
      path: 'https://api.example.com',
      domain: 'api.example.com'
    },

    apiserver: {
      http_port: 8080,
      https_port: 8443,
      ssl_key: '/path/to/ssl.key',
      ssl_cert: '/path/to/ssl.cert'
    },

    db: {
      host: 'localhost',
      port: '3306',
      username: 'USERNAME',
      password: 'PASSWORD',
      database: 'example_development',
      dialect: 'mysql'
    },

    logging: true,
  },
  test: {
    environment: {
      path: 'http://test.example.com',
      domain: 'test.example.com'
    },

    apiserver: {
      http_port: 7080,
      https_port: 7443,
      ssl_key: '/path/to/ssl.key',
      ssl_cert: '/path/to/ssl.cert'
    },

    db: {
      host: 'localhost',
      port: '3306',
      username: 'USERNAME',
      password: 'PASSWORD',
      database: 'example_test',
      dialect: 'mysql'
    },

    logging: false,
  }
}[process.env.NODE_ENV];
