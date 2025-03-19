import type { Next } from 'vona';
import type { IOnionSlice } from 'vona-module-a-onion';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionComposeData, ISocketConnectionExecute, ISocketConnectionRecord } from '../types/socketConnection.ts';
import { compose } from '@cabloy/compose';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { WebSocketServer } from 'ws';

const SymbolSocketConnections = Symbol('SymbolSocketConnections');

@Service()
export class ServiceSocket extends BeanBase {
  [SymbolSocketConnections]: Function;

  async appReady() {
    // maybe running in demo
    if (!this.app.server) return;
    // wss
    const wss = new WebSocketServer({ server: this.app.server });
    wss.on('connection', (ws, req) => {
      // enter
      this.app.bean.executor.newCtx(async () => {
        await this.composeSocketConnections({ method: 'enter', ws });
      }, { innerAccess: false, instance: true, req });
      ws.on('error', err => {
        this.$logger.error(err);
      });
      ws.on('message', data => {
        console.log('received: %s', data);
      });
      ws.send('something');
    });
  }

  get composeSocketConnections() {
    if (!this[SymbolSocketConnections]) {
      const connections = this.bean.onion.socketConnection.getOnionsEnabledWrapped(item => {
        return this._wrapOnion(item);
      });
      this[SymbolSocketConnections] = compose(connections);
    }
    return this[SymbolSocketConnections];
  }

  private _wrapOnion(item: IOnionSlice<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>) {
    const fn = (data: ISocketConnectionComposeData, next: Next) => {
      const options = item.beanOptions.options!;
      if (!this.bean.onion.checkOnionOptionsEnabled(options, this.ctx.path)) {
        return next();
      }
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean<ISocketConnectionExecute>(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`socketConnection bean not found: ${beanFullName}`);
      }
      return beanInstance[data.method](data.ws, options, next);
    };
    fn._name = item.name;
    return fn;
  }
}
