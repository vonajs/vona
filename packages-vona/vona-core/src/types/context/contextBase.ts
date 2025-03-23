import type { BeanContainer, Constructable, ILocalInfos, MetadataKey } from '../../lib/index.ts';
import type { VonaConfig } from '../config/config.ts';
import type { VonaContext } from './index.ts';

export interface ContextBase {
  get bean(): BeanContainer;
  get locale(): keyof ILocalInfos;
  set locale(value: keyof ILocalInfos);
  get instanceName(): string | undefined | null;
  set instanceName(value: string | undefined | null);
  get config(): VonaConfig;
  get innerAccess(): boolean;
  set innerAccess(value: boolean);
  get ctxCaller(): VonaContext;
  set ctxCaller(value: VonaContext);
  tail: (cb) => any;
  tailDone: () => Promise<any>;
  get tailCallbacks();
  getController: () => Constructable | undefined;
  getControllerPrototype: () => object | undefined;
  getControllerBeanFullName: () => string | undefined;
  getHandler: () => Function | undefined;
  getHandlerName: () => MetadataKey | undefined;
  get onionsDynamic(): any | undefined;
  set onionsDynamic(value: any | undefined);
  get acceptJSON(): boolean;
  redirect(url: string, status?: 301 | 302): void;
}
