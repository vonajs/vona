const jsonwebtoken = require('jsonwebtoken');

module.exports = class Jwt {
  async create({ scene = 'query' }) {
    // check
    if (!this.ctx.state.jwt) this.ctx.throw(403);
    // token
    const token = this.ctx.state.jwt.token;
    // jwt payload
    const payload = {
      token,
      exp: Date.now() + this.app.config.jwt.scene[scene].maxAge, // must use exp for safety
    };
    // jwt
    const secret = this.app.config.jwt.secret || this.app.config.keys.split(',')[0];
    const jwt = jsonwebtoken.sign(payload, secret);
    return { jwt };
  }
};
