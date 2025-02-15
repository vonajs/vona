import 'vona';
import type { EntityInstance } from './entity/instance.js';
declare module 'vona' {
  export interface VonaContext {
    instance: EntityInstance;
  }
}
