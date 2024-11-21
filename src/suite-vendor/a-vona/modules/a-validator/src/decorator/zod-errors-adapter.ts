import { VonaApplication } from 'vona';
import { setErrorMapDefault } from './zod-errorMapDefault.js';
import { setErrorMapContextual } from './zod_errorMapContextual.js';

export function errorsAdapter(app: VonaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
  setErrorMapContextual((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
}
