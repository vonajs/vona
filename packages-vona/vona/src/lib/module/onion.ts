import {
  IAopRecord,
  IControllerRecord,
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
  IDecoratorScheduleOptions,
  IDecoratorSocketConnectionOptions,
  IDecoratorSocketPacketOptions,
  IDecoratorStartupOptions,
  IDecoratorSummerCacheOptions,
  IEntityRecord,
  IFilterRecord,
  IGuardRecord,
  IInterceptorRecord,
  IMetaRecord,
  IMiddlewareRecord,
  IModelRecord,
  IPipeRecord,
  IQueueRecord,
  IScheduleRecord,
  ISocketConnectionRecord,
  ISocketPacketRecord,
  IStartupRecord,
  ISummerCacheRecord,
  VonaApplication,
} from '../../types/index.js';
import { Onion } from './onion/onion.js';

export default function (app: VonaApplication) {
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.onionMiddleware = app.bean._newBean(
    Onion<IDecoratorMiddlewareOptionsGlobal, keyof IMiddlewareRecord>,
    'middleware',
  );
  app.meta.onionGuard = app.bean._newBean(Onion<IDecoratorGuardOptionsGlobal, keyof IGuardRecord>, 'guard');
  app.meta.onionInterceptor = app.bean._newBean(
    Onion<IDecoratorInterceptorOptionsGlobal, keyof IInterceptorRecord>,
    'interceptor',
  );
  app.meta.onionPipe = app.bean._newBean(Onion<IDecoratorPipeOptionsGlobal, keyof IPipeRecord>, 'pipe');
  app.meta.onionFilter = app.bean._newBean(Onion<IDecoratorFilterOptionsGlobal, keyof IFilterRecord>, 'filter');
  app.meta.onionSocketConnection = app.bean._newBean(
    Onion<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>,
    'socketConnection',
  );
  app.meta.onionSocketPacket = app.bean._newBean(
    Onion<IDecoratorSocketPacketOptions, keyof ISocketPacketRecord>,
    'socketPacket',
  );
  app.meta.onionAop = app.bean._newBean(Onion<IDecoratorAopOptions, keyof IAopRecord>, 'aop');
  app.meta.onionEntity = app.bean._newBean(Onion<IDecoratorEntityOptions, keyof IEntityRecord>, 'entity');
  app.meta.onionModel = app.bean._newBean(Onion<IDecoratorModelOptions, keyof IModelRecord>, 'model');
  app.meta.onionController = app.bean._newBean(
    Onion<IDecoratorControllerOptions, keyof IControllerRecord>,
    'controller',
  );
  app.meta.onionMeta = app.bean._newBean(Onion<IDecoratorMetaOptions, keyof IMetaRecord>, 'meta');
  app.meta.onionSummerCache = app.bean._newBean(
    Onion<IDecoratorSummerCacheOptions, keyof ISummerCacheRecord>,
    'summerCache',
  );
  app.meta.onionStartup = app.bean._newBean(Onion<IDecoratorStartupOptions, keyof IStartupRecord>, 'startup');
  app.meta.onionQueue = app.bean._newBean(Onion<IDecoratorQueueOptions, keyof IQueueRecord>, 'queue');
  app.meta.onionSchedule = app.bean._newBean(Onion<IDecoratorScheduleOptions, keyof IScheduleRecord>, 'schedule');
}
