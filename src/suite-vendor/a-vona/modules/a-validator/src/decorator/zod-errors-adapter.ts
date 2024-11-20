import { VonaApplication } from 'vona';
import { setErrorMap } from './zod-errors.js';
import { z } from 'zod';

export function errorsAdapter(app: VonaApplication) {
  setErrorMap((key: string, issue: z.ZodIssueOptionalMessage) => {
    app.
    return '';
  });
}
