import type { EntityInstance } from './entity/instance.ts';
import 'vona';

declare module 'vona' {
  export interface VonaContext {
    instance: EntityInstance;
  }
}
