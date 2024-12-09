import {
  IDecoratorAopOptions,
  IDecoratorControllerOptions,
  IDecoratorEntityOptions,
  IDecoratorFilterOptionsGlobal,
  IDecoratorGuardOptionsGlobal,
  IDecoratorInterceptorOptionsGlobal,
  IDecoratorMetaOptions,
  IDecoratorMiddlewareOptionsGlobal,
  IDecoratorModelOptions,
  IDecoratorPipeOptionsGlobal,
  IDecoratorQueueOptions,
  IDecoratorSocketConnectionOptions,
  IDecoratorSocketPacketOptions,
  IDecoratorStartupOptions,
  IDecoratorSummerCacheOptions,
  VonaApplication,
} from '../../types/index.js';
import { Onion } from './onion/onion.js';

export default function (app: VonaApplication) {
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.onionMiddleware = app.bean._newBean(Onion<IDecoratorMiddlewareOptionsGlobal>, 'middleware');
  app.meta.onionGuard = app.bean._newBean(Onion<IDecoratorGuardOptionsGlobal>, 'guard');
  app.meta.onionInterceptor = app.bean._newBean(Onion<IDecoratorInterceptorOptionsGlobal>, 'interceptor');
  app.meta.onionPipe = app.bean._newBean(Onion<IDecoratorPipeOptionsGlobal>, 'pipe');
  app.meta.onionFilter = app.bean._newBean(Onion<IDecoratorFilterOptionsGlobal>, 'filter');
  app.meta.onionSocketConnection = app.bean._newBean(Onion<IDecoratorSocketConnectionOptions>, 'socketConnection');
  app.meta.onionSocketPacket = app.bean._newBean(Onion<IDecoratorSocketPacketOptions>, 'socketPacket');
  app.meta.onionAop = app.bean._newBean(Onion<IDecoratorAopOptions>, 'aop');
  app.meta.onionEntity = app.bean._newBean(Onion<IDecoratorEntityOptions>, 'entity');
  app.meta.onionModel = app.bean._newBean(Onion<IDecoratorModelOptions>, 'model');
  app.meta.onionController = app.bean._newBean(Onion<IDecoratorControllerOptions>, 'controller');
  app.meta.onionMeta = app.bean._newBean(Onion<IDecoratorMetaOptions>, 'meta');
  app.meta.onionSummerCache = app.bean._newBean(Onion<IDecoratorSummerCacheOptions>, 'summerCache');
  app.meta.onionStartup = app.bean._newBean(Onion<IDecoratorStartupOptions>, 'startup');
  app.meta.onionQueue = app.bean._newBean(Onion<IDecoratorQueueOptions>, 'queue');
}
