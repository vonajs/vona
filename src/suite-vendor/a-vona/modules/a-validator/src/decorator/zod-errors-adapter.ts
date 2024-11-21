import { VonaApplication } from 'vona';
import { setErrorMapDefault } from './zod-errorMapDefault.js';
import { setErrorMapSchema } from './zod_errorMapSchema.js';

export function errorsAdapter(app: VonaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
}
