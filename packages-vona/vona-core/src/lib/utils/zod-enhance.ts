import type { VonaApplication } from '../core/application.ts';
import { setLocaleAdapter } from '@cabloy/zod-errors-custom';

export function zodEnhance(app: VonaApplication) {
  setLocaleAdapter((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
}
