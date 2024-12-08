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
  app.meta.onionSocketConnection = app.bean._newBean(Onion, 'socketConnection');
  app.meta.onionSocketPacket = app.bean._newBean(Onion, 'socketPacket');
  app.meta.onionAop = app.bean._newBean(Onion, 'aop');
  app.meta.onionEntity = app.bean._newBean(Onion, 'entity');
  app.meta.onionModel = app.bean._newBean(Onion, 'model');
  app.meta.onionController = app.bean._newBean(Onion, 'controller');
  app.meta.onionMeta = app.bean._newBean(Onion, 'meta');
  app.meta.onionSummerCache = app.bean._newBean(Onion, 'summerCache');
  app.meta.onionStartup = app.bean._newBean(Onion, 'startup');
  app.meta.onionQueue = app.bean._newBean(Onion, 'queue');
}
