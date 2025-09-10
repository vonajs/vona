import type { VonaApplication } from 'vona';
import { setErrorMapSchema } from '@cabloy/zod-errors-custom';

export function errorsAdapter(app: VonaApplication) {
  // setErrorMapDefault((text: string, ...args: any[]) => {
  //   return app.meta.text(text, ...args);
  // });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
}
