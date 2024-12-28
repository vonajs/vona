import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';
import { ContextOthers } from './contextOthers.js';
import { VonaApplication } from '../application/app.js';
import { BeanContainer } from '../../lib/bean/beanContainer.js';
import { ContextState } from './contextState.js';
export * from './contextState.js';

// @ts-ignore ignore the throw type check of 'throw'/'meta'
export interface VonaContext extends ContextBase, ContextOthers, EggContext {
  app: VonaApplication;
  bean: BeanContainer;
  state: ContextState;
  [key: string | symbol]: any; // should use any rather than unknown
}
