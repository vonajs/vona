import type { EggRouter } from '@eggjs/router';

declare module 'vona' {
  export interface VonaApplication {
    router: EggRouter;
  }
}
