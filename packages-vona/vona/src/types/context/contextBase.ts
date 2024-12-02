import { CtxMeta } from '../../lib/core/metaCtx.js';
import { Constructable, MetadataKey } from '../../lib/index.js';
import { VonaConfig } from '../config/config.js';
import { IModule } from '../interface/module.js';

export interface ContextBase {
  get config(): VonaConfig;
  get module(): IModule; // not union null
  get meta(): CtxMeta;
  get innerAccess();
  set innerAccess(value);
  get dbLevel();
  set dbLevel(value);
  get subdomain();
  set subdomain(value);
  get ctxCaller();
  set ctxCaller(value);
  get cache();
  tail(cb);
  tailDone(): Promise<any>;
  get tailCallbacks();
  getPayload(options?): Promise<any>;
  getClass(): Constructable | undefined;
  getClassPrototype(): object | undefined;
  getClassBeanFullName(): string | undefined;
  getHandler(): Function | undefined;
  getHandlerName(): MetadataKey | undefined;
}
