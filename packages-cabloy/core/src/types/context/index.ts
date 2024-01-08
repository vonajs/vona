import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';
import { ContextError } from './contextError.js';

export interface CabloyContext extends ContextError, ContextBase, Omit<EggContext, 'meta'> {}
