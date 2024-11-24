import { VonaApplication } from 'vona';
import { setErrorMapDefault, setErrorMapSchema } from '@cabloy/zod-errors-custom';

export function errorsAdapter(app: VonaApplication) {
  setErrorMapDefault((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
  setErrorMapSchema((text: string, ...args: any[]) => {
    return app.text(text, ...args);
  });
}
