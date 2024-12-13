import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

import jsonwebtoken from 'jsonwebtoken';

@Service()
export class ServiceJwt extends BeanBase {
  async create({ scene = 'query' }: any) {
    // check
    if (!this.ctx.state.jwt) this.app.throw(403);
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
}
