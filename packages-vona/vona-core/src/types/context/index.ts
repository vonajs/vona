import type { VonaApplication } from '../../lib/core/application.ts';
import type { ContextBase } from './contextBase.ts';
import type { ContextOthers } from './contextOthers.ts';
import type { ContextState } from './contextState.ts';

export * from './contextState.ts';

// @ts-ignore ignore the throw type check of 'throw'/'meta'
export interface VonaContext extends ContextBase, ContextOthers {
  app: VonaApplication;
  state: ContextState;
  [key: string | symbol]: any; // should use any rather than unknown
}
