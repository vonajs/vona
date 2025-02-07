import { BeanContainer, Constructable, ILocalInfos, MetadataKey } from '../../lib/index.js';
import { VonaConfig } from '../config/config.js';
import { VonaContext } from './index.js';

export interface ContextBase {
  get bean(): BeanContainer;
  get locale(): keyof ILocalInfos;
  set locale(value: keyof ILocalInfos);
  get instanceName(): string | undefined | null;
  set instanceName(value: string | undefined | null);
  get config(): VonaConfig;
  get innerAccess(): boolean;
  set innerAccess(value: boolean);
  get dbLevel(): number;
  set dbLevel(value: number | undefined);
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
