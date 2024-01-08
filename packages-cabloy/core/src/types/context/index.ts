import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';

export interface CabloyContext extends ContextBase, Omit<EggContext, 'meta'> {}
