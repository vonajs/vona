import { VonaApplication } from 'vona';
import { setErrorMap, translateError } from './zod-errors.js';
import { z } from 'zod';

export function errorsAdapter(app: VonaApplication) {
  setErrorMap((key: string, issue: z.ZodIssueOptionalMessage) => {
    return translateError(app.text(key), issue);
  });
}
