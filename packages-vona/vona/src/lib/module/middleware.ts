import { VonaApplication } from '../../types/index.js';
import { MiddlewareLike } from './middleware/middlewareLike.js';

export default function (app: VonaApplication) {
  // load
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.middlewaresGuard = app.bean._newBean(MiddlewareLike, 'guard');
  app.meta.middlewaresInterceptor = app.bean._newBean(MiddlewareLike, 'interceptor');
  app.meta.middlewaresPipe = app.bean._newBean(MiddlewareLike, 'pipe');
  app.meta.middlewaresConnection = app.bean._newBean(MiddlewareLike, 'connection');
  app.meta.middlewaresPacket = app.bean._newBean(MiddlewareLike, 'packet');
}
