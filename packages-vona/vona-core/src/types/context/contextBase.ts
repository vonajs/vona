import { Constructable, MetadataKey } from '../../lib/index.js';
import { VonaConfig } from '../config/config.js';
import { VonaContext } from './index.js';

export interface ContextBase {
  get config(): VonaConfig;
  get innerAccess(): boolean;
  set innerAccess(value: boolean);
  get dbLevel(): number;
  set dbLevel(value: number | undefined);
  get subdomain(): string;
  set subdomain(value: string);
  get ctxCaller(): VonaContext;
  set ctxCaller(value: VonaContext);
  tail(cb);
  tailDone(): Promise<any>;
  get tailCallbacks();
  getPayload(options?): Promise<any>;
  getController(): Constructable | undefined;
  getControllerPrototype(): object | undefined;
  getControllerBeanFullName(): string | undefined;
  getHandler(): Function | undefined;
  getHandlerName(): MetadataKey | undefined;
  get onionsDynamic(): any | undefined;
  set onionsDynamic(value: any | undefined);
}
