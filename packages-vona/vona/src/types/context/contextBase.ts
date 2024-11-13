import { CtxMeta } from '../../lib/core/metaCtx.js';
import { Constructable } from '../../lib/index.js';
import { IModule } from '../interface/module.js';

export interface ContextBase {
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
  successMore(list, index, size);
  getPayload(options?): Promise<any>;
  getClass(): Constructable;
  getHandler(): Function;
  getClassBeanFullName(): string;
}
