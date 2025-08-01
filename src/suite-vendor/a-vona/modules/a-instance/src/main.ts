import type { IInstanceRecord, IModuleMain, VonaContext } from 'vona';
import type { IInstanceConfig } from './config/config.ts';
import { $customKey, BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

const SymbolInstanceName = Symbol('SymbolInstanceName');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    const options = this.bean.scope(__ThisModule__).config;
    this.app.context.__getInstanceName = function (this: VonaContext) {
      return __getInstanceName(this, options);
    };
    this.app.context.__setInstanceName = function (this: VonaContext, instanceName: keyof IInstanceRecord) {
      return __setInstanceName(this, instanceName);
    };
  }

  async configLoaded(_config: any) {}
}

function __setInstanceName(ctx: VonaContext, instanceName: keyof IInstanceRecord | undefined | null) {
  ctx[SymbolInstanceName] = instanceName;
}

function __getInstanceName(ctx: VonaContext, options: IInstanceConfig) {
  if (Object.prototype.hasOwnProperty.call(ctx, SymbolInstanceName)) {
    return ctx[SymbolInstanceName];
  }

  let instanceName;
  if (options.getInstanceName) {
    instanceName = options.getInstanceName(ctx);
  } else {
    // not use query params for safety
    // header: x-vona-instance-name
    instanceName = ctx.req.headers[$customKey('x-vona-instance-name')];
    if (instanceName === undefined) {
      // subdomains
      instanceName = ctx.subdomains.join('.');
    }
  }

  __setInstanceName(ctx, instanceName);
  return instanceName;
}
