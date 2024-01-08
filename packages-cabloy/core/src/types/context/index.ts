import { Context as EggContext } from 'egg';
import { ContextBase } from './contextBase.js';

export interface Context extends ContextBase, EggContext {}
