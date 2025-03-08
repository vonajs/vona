import type { IJwtClientOptions, IJwtClientRecord, IJwtPayload } from '../types/jwt.ts';
import * as jwt from 'jsonwebtoken';
import { BeanBase, cast, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceJwtClient extends BeanBase {
  private _jwtInstance: typeof jwt;
  private _clientName: keyof IJwtClientRecord;
  private _clientOptions: IJwtClientOptions;

  get instance(): typeof jwt {
    return this._jwtInstance;
  }

  protected __init__(clientName?: keyof IJwtClientRecord) {
    this._createClient(clientName);
  }

  private _createClient(clientName?: keyof IJwtClientRecord) {
    clientName = clientName || 'temp';
    const configJwt = this.scope.config;
    const configClient = configJwt.clients[clientName];
    if (!configClient) throw new Error(`jwt client not found: ${clientName}`);
    this._clientOptions = deepExtend({
      secret: this.app.config.server.keys[0],
    }, configJwt.default, configClient);
    this._clientName = clientName;
    this._jwtInstance = jwt;
  }

  private get fieldClient() {
    return this.scope.config.field.payload.client;
  }

  private get fieldPath() {
    return this.scope.config.field.payload.path;
  }

  async sign(payload: IJwtPayload) {
    return new Promise((resolve, reject) => {
      payload = Object.assign({}, payload, { [this.fieldClient]: this._clientName });
      this._jwtInstance.sign(payload, this._clientOptions.secret!, this._clientOptions.signOptions, (err, encoded) => {
        if (err) return reject(err);
        resolve(encoded);
      });
    });
  }

  async verify(token?: string): Promise<IJwtPayload> {
    if (!token) token = this.scope.service.jwtExtract.fromAllWays();
    if (!token) this.app.throw(401, 'jwt token not found');
    return new Promise((resolve, reject) => {
      this._jwtInstance.verify(token, this._clientOptions.secret!, this._clientOptions.signOptions, (err, decoded) => {
        if (err) return reject(err);
        const payload = cast<IJwtPayload>(decoded);
        // check field client
        if (payload[this.fieldClient] !== this._clientName) return this.app.throw(401);
        // check field path
        if (payload[this.fieldPath] && payload[this.fieldPath] !== this.ctx.route.routePathRaw) return this.app.throw(401);
        // passed
        resolve(payload);
      });
    });
  }
}
