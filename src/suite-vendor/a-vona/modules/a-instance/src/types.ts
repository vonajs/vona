import type { EntityInstance } from './entity/instance.js';
import 'vona';

declare module 'vona' {
  export interface VonaContext {
    instance: EntityInstance;
  }
}
