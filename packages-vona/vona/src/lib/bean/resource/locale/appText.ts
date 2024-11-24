import { VonaApplication } from '../../../../types/application/app.js';

export function createAppText(app: VonaApplication) {
  // app
  app.text = function (text, ...args) {
    return app.meta.locale.getText(false, undefined, undefined, text, ...args);
  } as any;
  app.text.locale = function (locale, text, ...args) {
    return app.meta.locale.getText(false, undefined, locale, text, ...args);
  };
}
