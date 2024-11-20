import { VonaApplication } from 'vona';
import { setErrorMap } from './zod-errors.js';
import { z } from 'zod';

export function errorsAdapter(_app: VonaApplication) {
  setErrorMap((_key: string, _issue: z.ZodIssueOptionalMessage) => {
    //app.
    return '';
  });
}
