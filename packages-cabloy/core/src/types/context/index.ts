import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';
import { ContextLocale } from './contextLocale.js';
import { ContextError } from '../../lib/resource/error/errorContext.js';
import { CabloyApplication } from '../application/app.js';
import { BeanContainerLike } from '../../lib/bean/beanContainer.js';

export interface CabloyContext extends ContextLocale, ContextError, ContextBase, Omit<EggContext, 'meta'> {
  app: CabloyApplication;
  bean: BeanContainerLike;
}
