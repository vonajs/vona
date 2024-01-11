import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';
import { ContextError } from './contextError.js';
import { CabloyApplication } from '../application/app.js';

export interface CabloyContext extends ContextError, ContextBase, Omit<EggContext, 'meta'> {
  app: CabloyApplication;
}
