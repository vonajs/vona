import {
  IAopRecord,
  IDecoratorAopOptions,
  IDecoratorMetaOptions,
  IDecoratorMiddlewareOptionsGlobal,
  IDecoratorSocketConnectionOptions,
  IDecoratorSocketPacketOptions,
  IDecoratorStartupOptions,
  IMetaRecord,
  IMiddlewareRecord,
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
