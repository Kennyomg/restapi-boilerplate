module.exports = { // eslint-disable-line
  unauthorized: {
    status: 401, code: 'unauthorized', message: 'Authorization header is required',
  },
  invalidApiKey: {
    status: 401, code: 'invalid_api_key', message: 'Invalid API key',
  },
  serverError: {
    status: 500,
    code: 'server_error',
    message: 'There was a problem processing the request, please check your parameters and try again',
  },
  httpVersionNotSupported: {
    status: 505,
    code: 'http_version_not_supported',
    message: 'HTTPS protocol is required',
  },
  pathNotFound: {
    status: 404,
    code: 'path_not_found',
    message: 'There is no method on this path',
  },
  invalidMethod: {
    status: 400,
    code: 'invalid_method',
    messsage: 'The request method you used is not supported by this API',
  },
  invalidParameters: {
    status: 400,
    code: 'invalid_parameters',
    messsage: 'There was a problem with your parameters, please check your them and try again',
  },
  widgetNotFound: {
    status: 404,
    code: 'widget_not_found',
    message: 'No widget found by this ID',
  },
};
