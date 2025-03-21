import type { Next } from 'vona';
import type { IOnionSlice } from 'vona-module-a-onion';
import type { IDecoratorSocketConnectionOptions, ISocketConnectionComposeData, ISocketConnectionExecute, ISocketConnectionRecord, ISocketPacketComposeData } from '../types/socketConnection.ts';
import type { IDecoratorSocketPacketOptions, ISocketPacketExecute, ISocketPacketRecord } from '../types/socketPacket.ts';
import { compose } from '@cabloy/compose';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { WebSocket, WebSocketServer } from 'ws';

const SymbolSocketConnections = Symbol('SymbolSocketConnections');
const SymbolSocketPackets = Symbol('SymbolSocketPackets');

@Service()
export class ServiceSocket extends BeanBase {
  [SymbolSocketConnections]: Function;
  [SymbolSocketPackets]: Function;

  async appReady() {
    // maybe running in demo
    if (!this.app.server) return;
    // wss
    this.app.wss = new WebSocketServer({ server: this.app.server });
    this.app.wss.on('connection', (ws, req) => {
      this._onConnection(ws, req);
    });
  }

  private async _onConnection(ws: WebSocket, req: any) {
    // enter
    return await this.app.bean.executor.newCtx(async () => {
      const ctx = this.app.ctx;
      Object.defineProperty(ctx, 'ws', {
        get() {
          return ws;
        },
      });
      // enter
      await this.composeSocketConnections({ method: 'enter', ws });
      return new Promise(resolve => {
        // exit
        ws.onclose = async () => {
          await this.app.ctxStorage.run(ctx as any, async () => {
            await this.composeSocketConnections({ method: 'exit', ws });
          });
          resolve(undefined);
        };
        // message
        ws.onmessage = async event => {
          await this.app.ctxStorage.run(ctx as any, async () => {
            await this.composeSocketPackets({ data: event.data, ws });
          });
        };
        // error
        ws.onerror = event => {
          this.$logger.error(event.error);
        };
      });
    }, { dbLevel: 0, innerAccess: false, req, reqInherit: true }); // not set instanceName
  }

  private get composeSocketConnections() {
    if (!this[SymbolSocketConnections]) {
      const connections = this.bean.onion.socketConnection.getOnionsEnabledWrapped(item => {
        return this._wrapOnionConnection(item);
      });
      this[SymbolSocketConnections] = compose(connections);
    }
    return this[SymbolSocketConnections];
  }

  private get composeSocketPackets() {
    if (!this[SymbolSocketPackets]) {
      const packets = this.bean.onion.socketPacket.getOnionsEnabledWrapped(item => {
        return this._wrapOnionPacket(item);
      });
      this[SymbolSocketPackets] = compose(packets);
    }
    return this[SymbolSocketPackets];
  }

  private _wrapOnionConnection(item: IOnionSlice<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>) {
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

  private _wrapOnionPacket(item: IOnionSlice<IDecoratorSocketPacketOptions, keyof ISocketPacketRecord>) {
    const fn = (data: ISocketPacketComposeData, next: Next) => {
      const options = item.beanOptions.options!;
      if (!this.bean.onion.checkOnionOptionsEnabled(options, this.ctx.path)) {
        return next();
      }
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean<ISocketPacketExecute>(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`socketPacket bean not found: ${beanFullName}`);
      }
      return beanInstance.execute(data.data, data.ws, options, next);
    };
    fn._name = item.name;
    return fn;
  }
}
