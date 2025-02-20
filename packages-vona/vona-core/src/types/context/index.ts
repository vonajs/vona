import type { Context as EggContext } from 'egg';
import type { VonaApplication } from '../application/app.ts';
import type { ContextBase } from './contextBase.ts';
import type { ContextOthers } from './contextOthers.ts';
import type { ContextState } from './contextState.ts';

export * from './contextState.ts';

// @ts-ignore ignore the throw type check of 'throw'/'meta'
export interface VonaContext extends ContextBase, ContextOthers, EggContext {
  app: VonaApplication;
  state: ContextState;
  [key: string | symbol]: any; // should use any rather than unknown
}
