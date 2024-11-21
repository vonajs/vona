import { VonaApplication } from 'vona';
import { setErrorMapDefault } from './errorMapDefault.js';
import { setErrorMapSchema } from './errorMapSchema.js';

export function errorsAdapter(app: VonaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
}
