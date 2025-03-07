import type { IJwtClientOptions, IJwtClientRecord } from '../types/jwt.ts';
import * as jwt from 'jsonwebtoken';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceJwtClient extends BeanBase {
  private _jwtInstance: typeof jwt;
  private _jwtClientOptions: IJwtClientOptions;

  get instance(): typeof jwt {
    return this._jwtInstance;
  }

  protected __init__(clientName?: keyof IJwtClientRecord) {
    // instance
    this._jwtInstance = this._createClient(clientName);
  }

  private _createClient(clientName?: keyof IJwtClientRecord): typeof jwt {
    clientName = clientName || 'query';
    const configJwt = this.scope.config;
    const configClient = configJwt.clients[clientName];
    if (!configClient) throw new Error(`jwt client not found: ${clientName}`);
    this._jwtClientOptions = deepExtend({}, configJwt.default, configClient);
    return jwt;
  }

  async sign(payload: IJwtPayload) {

  }
}
