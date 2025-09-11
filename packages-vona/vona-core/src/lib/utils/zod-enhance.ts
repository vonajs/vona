import type { VonaApplication } from '../core/application.ts';
import { setlLocaleAdapter } from '@cabloy/zod-errors-custom';

export function zodEnhance(app: VonaApplication) {
  setlLocaleAdapter((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
}
