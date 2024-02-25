import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';
import { ContextLocale } from './contextLocale.js';
import { ContextError } from '../../lib/bean/resource/error/errorContext.js';
import { CabloyApplication } from '../application/app.js';
import { BeanContainerLike } from '../../lib/bean/beanContainer.js';

// @ts-ignore ignore the throw type check of 'throw'/'meta'
export interface CabloyContext extends ContextLocale, ContextError, ContextBase, EggContext {
  app: CabloyApplication;
  bean: BeanContainerLike;
}
