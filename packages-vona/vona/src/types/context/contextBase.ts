import { CtxMeta } from '../../lib/core/metaCtx.js';
import { Constructable, MetadataKey } from '../../lib/index.js';
import { VonaConfig } from '../config/config.js';

export interface ContextBase {
  get config(): VonaConfig;
  get meta(): CtxMeta;
  get innerAccess();
  set innerAccess(value);
  get dbLevel();
  set dbLevel(value);
  get subdomain(): string;
  set subdomain(value: string);
  get ctxCaller();
  set ctxCaller(value);
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
