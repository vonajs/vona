import { VonaApplication } from 'vona';
import { setErrorMap } from './zod-errors.js';

export function errorsAdapter(app: VonaApplication) {
  setErrorMap(() => {
    console.log('adapter--', app.ctx.url);
  });
}
