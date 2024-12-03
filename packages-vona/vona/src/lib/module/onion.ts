import { VonaApplication } from '../../types/index.js';
import { Onion } from './onion/onion.js';

export default function (app: VonaApplication) {
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.onionMiddleware = app.bean._newBean(Onion, 'middleware');
  app.meta.onionGuard = app.bean._newBean(Onion, 'guard');
  app.meta.onionInterceptor = app.bean._newBean(Onion, 'interceptor');
  app.meta.onionPipe = app.bean._newBean(Onion, 'pipe');
  app.meta.onionFilter = app.bean._newBean(Onion, 'filter');
  app.meta.onionConnection = app.bean._newBean(Onion, 'connection');
  app.meta.onionPacket = app.bean._newBean(Onion, 'packet');
  app.meta.onionAop = app.bean._newBean(Onion, 'aop');
  app.meta.onionEntity = app.bean._newBean(Onion, 'entity');
  app.meta.onionModel = app.bean._newBean(Onion, 'model');
}
