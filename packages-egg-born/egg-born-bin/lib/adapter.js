const ioc = require('socket.io-client');

module.exports = options => {
  const { openAuthClient } = options;
  return {
    _io: null,
    initialize(io) {
      this._io = io;
      // reset
      this._io.reset();
    },
    socket() {
      // url
      const url = openAuthClient.token.host;
      // opts
      const opts = {
        autoConnect: false,
        withCredentials: true,
        transports: ['websocket'],
      };
      // scene
      opts.query = {};
      // jwt
      opts.query['eb-jwt'] = openAuthClient.jwt.accessToken;
      return ioc(url, opts);
    },
    user() {
      return null;
    },
    logout() {
      // do nothing
    },
  };
};
