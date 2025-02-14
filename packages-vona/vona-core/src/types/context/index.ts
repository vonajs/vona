import type { Context as EggContext } from 'egg';
import type { ContextBase } from './contextBase.js';
import type { ContextOthers } from './contextOthers.js';
import type { VonaApplication } from '../application/app.js';
import type { ContextState } from './contextState.js';
export * from './contextState.js';

// @ts-ignore ignore the throw type check of 'throw'/'meta'
export interface VonaContext extends ContextBase, ContextOthers, EggContext {
  app: VonaApplication;
  state: ContextState;
  [key: string | symbol]: any; // should use any rather than unknown
}
