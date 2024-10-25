import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';
import { ContextLocale } from './contextLocale.js';
import { ContextOthers } from './contextOthers.js';
import { ContextError } from '../../lib/bean/resource/error/errorContext.js';
import { VonaApplication } from '../application/app.js';
import { BeanContainer } from '../../lib/bean/beanContainer.js';
import { ContextConfig } from './contextConfig.js';
import { ContextState } from './contextState.js';
export * from './contextState.js';

// @ts-ignore ignore the throw type check of 'throw'/'meta'
export interface VonaContext extends ContextLocale, ContextError, ContextBase, ContextOthers, EggContext {
  app: VonaApplication;
  bean: BeanContainer;
  config: ContextConfig;
  state: ContextState;
  [key: string | symbol]: any; // should use any rather than unknown
}
