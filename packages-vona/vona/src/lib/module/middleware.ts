import { VonaApplication } from '../../types/index.js';
import { Onion } from './onion/onion.js';

export default function (app: VonaApplication) {
  // load
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.middlewaresGeneral = app.bean._newBean(Onion, 'middleware');
  app.meta.middlewaresGuard = app.bean._newBean(Onion, 'guard');
  app.meta.middlewaresInterceptor = app.bean._newBean(Onion, 'interceptor');
  app.meta.middlewaresPipe = app.bean._newBean(Onion, 'pipe');
  app.meta.middlewaresConnection = app.bean._newBean(Onion, 'connection');
  app.meta.middlewaresPacket = app.bean._newBean(Onion, 'packet');
}
