import type { VonaApplicationOptions } from '../../types/application/app.ts';
import type { VonaConfig } from '../../types/config/config.ts';
import type { VonaContext } from '../../types/context/index.ts';
import type { ApplicationError } from '../bean/resource/error/errorApplication.ts';
import KoaApplication from 'koa';
import { BeanContainer } from '../bean/beanContainer.ts';
import { AppUtil } from '../utils/util.ts';
import { contextBase } from './context.ts';
import { AppMeta } from './meta.ts';

export interface VonaApplication extends ApplicationError {}

export class VonaApplication extends KoaApplication {
  options: VonaApplicationOptions;
  util: AppUtil;
  meta: AppMeta;
  bean: BeanContainer;
  config: VonaConfig;

  constructor(options: VonaApplicationOptions) {
    super(options);
    this.options = options;
    this.bean = BeanContainer.create(this, undefined);
    // util
    this.util = this.bean._newBean(AppUtil);
    // meta
    this.meta = this.bean._newBean(AppMeta);
    // app.context
    for (const key of Reflect.ownKeys(contextBase)) {
      const desc = Object.getOwnPropertyDescriptor(contextBase, key)!;
      Object.defineProperty(this.context, key, desc);
    }
  }

  get ctx(): VonaContext {
    return this.currentContext as unknown as VonaContext;
  }
}
