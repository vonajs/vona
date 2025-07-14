import type { IJwtClientOptions, IJwtClientRecord, IJwtPayload, IJwtSignOptions, IJwtVerifyOptions, IPayloadDataBase } from '../types/jwt.ts';
import jwt from 'jsonwebtoken';
import { BeanBase, cast, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

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
    clientName = clientName || 'access';
    const configJwt = this.scope.config;
    const configClient = configJwt.clients[clientName];
    if (!configClient) throw new Error(`jwt client not found: ${clientName}`);
    const secret = configJwt.default.secret ?? this.app.config.server.keys[0];
    this._clientOptions = deepExtend({ }, configJwt.default, { secret }, configClient);
    this._clientName = clientName;
    this._jwtInstance = jwt;
  }

  private get fieldClient() {
    return this.scope.config.field.payload.client;
  }

  private get fieldPath() {
    return this.scope.config.field.payload.path;
  }

  private get fieldData() {
    return this.scope.config.field.payload.data;
  }

  async sign(payloadData: IPayloadDataBase, options?: IJwtSignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload: IJwtPayload = {
        [this.fieldClient]: this._clientName,
        [this.fieldData]: payloadData,
      };
      if (options?.path) payload[this.fieldPath] = options.path;
      let signOptions = this._clientOptions.signOptions;
      if (options?.dev) {
        signOptions = Object.assign({}, signOptions, { expiresIn: this.scope.config.clients.refresh.signOptions.expiresIn });
      }
      if (options?.temp) {
        signOptions = Object.assign({}, signOptions, { expiresIn: this.scope.config.tempToken.signOptions.expiresIn });
      }
      this._jwtInstance.sign(payload, this._clientOptions.secret!, signOptions, (err, encoded) => {
        if (err) return reject(err);
        resolve(encoded!);
      });
    });
  }

  async verify(token?: string, options?: IJwtVerifyOptions): Promise<IPayloadDataBase | undefined> {
    if (!token && this._clientName === 'access') token = this.scope.service.jwtExtract.fromAllWays();
    if (!token) return undefined;
    return new Promise((resolve, reject) => {
      this._jwtInstance.verify(token, this._clientOptions.secret!, this._clientOptions.signOptions, (err, decoded) => {
        if (err) return reject(err);
        const payload = cast<IJwtPayload>(decoded);
        // check field client
        if (payload[this.fieldClient] !== this._clientName) return this.app.throw(401);
        // check field path
        if (!this._checkVerifyPath(payload[this.fieldPath], options?.path)) return this.app.throw(401);
        // passed
        resolve(payload[this.fieldData]);
      });
    });
  }

  _checkVerifyPath(pathTarget: string | string[] | undefined, pathReal: string | undefined) {
    if (!pathTarget) return true;
    const path = pathReal ?? String(this.ctx.route.routePathRaw);
    if (Array.isArray(pathTarget) && !pathTarget.includes(path)) return false;
    return pathTarget === path;
  }
}
