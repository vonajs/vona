import type { IJwtClientOptions, IJwtClientRecord, IJwtPayload } from '../types/jwt.ts';
import * as jwt from 'jsonwebtoken';
import { BeanBase, deepExtend } from 'vona';
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
    clientName = clientName || 'query';
    const configJwt = this.scope.config;
    const configClient = configJwt.clients[clientName];
    if (!configClient) throw new Error(`jwt client not found: ${clientName}`);
    this._clientOptions = deepExtend({
      secret: this.app.config.server.keys[0],
    }, configJwt.default, configClient);
    this._clientName = clientName;
    this._jwtInstance = jwt;
  }

  async sign(payload: IJwtPayload) {

  }
}
