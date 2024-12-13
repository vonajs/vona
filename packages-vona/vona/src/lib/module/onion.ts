import {
  IAopRecord,
  IDecoratorAopOptions,
  IDecoratorGuardOptionsGlobal,
  IDecoratorInterceptorOptionsGlobal,
  IDecoratorMetaOptions,
  IDecoratorMiddlewareOptionsGlobal,
  IDecoratorPipeOptionsGlobal,
  IDecoratorSocketConnectionOptions,
  IDecoratorSocketPacketOptions,
  IDecoratorStartupOptions,
  IGuardRecord,
  IInterceptorRecord,
  IMetaRecord,
  IMiddlewareRecord,
  IPipeRecord,
  ISocketConnectionRecord,
  ISocketPacketRecord,
  IStartupRecord,
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
  app.meta.onionSocketConnection = app.bean._newBean(
    Onion<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>,
    'socketConnection',
  );
  app.meta.onionSocketPacket = app.bean._newBean(
    Onion<IDecoratorSocketPacketOptions, keyof ISocketPacketRecord>,
    'socketPacket',
  );
  app.meta.onionAop = app.bean._newBean(Onion<IDecoratorAopOptions, keyof IAopRecord>, 'aop');
  app.meta.onionMeta = app.bean._newBean(Onion<IDecoratorMetaOptions, keyof IMetaRecord>, 'meta');
  app.meta.onionStartup = app.bean._newBean(Onion<IDecoratorStartupOptions, keyof IStartupRecord>, 'startup');
}
