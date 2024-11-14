import { VonaApplication } from '../../types/index.js';
import { Onion } from './onion/onion.js';

export default function (app: VonaApplication) {
  // load
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.onionMiddleware = app.bean._newBean(Onion, 'middleware');
  app.meta.onionGuard = app.bean._newBean(Onion, 'guard');
  app.meta.onionInterceptor = app.bean._newBean(Onion, 'interceptor');
  app.meta.onionPipe = app.bean._newBean(Onion, 'pipe');
  app.meta.onionConnection = app.bean._newBean(Onion, 'connection');
  app.meta.onionPacket = app.bean._newBean(Onion, 'packet');
}
