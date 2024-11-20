import { VonaApplication } from 'vona';
import { setErrorMap } from './zod-errors.js';

export function errorsAdapter(app: VonaApplication) {
  setErrorMap((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
}
