import {
  IDecoratorMetaOptions,
  IDecoratorSocketConnectionOptions,
  IDecoratorSocketPacketOptions,
  IDecoratorStartupOptions,
  IMetaRecord,
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
  app.meta.onionSocketConnection = app.bean._newBean(
    Onion<IDecoratorSocketConnectionOptions, keyof ISocketConnectionRecord>,
    'socketConnection',
  );
  app.meta.onionSocketPacket = app.bean._newBean(
    Onion<IDecoratorSocketPacketOptions, keyof ISocketPacketRecord>,
    'socketPacket',
  );
  app.meta.onionMeta = app.bean._newBean(Onion<IDecoratorMetaOptions, keyof IMetaRecord>, 'meta');
  app.meta.onionStartup = app.bean._newBean(Onion<IDecoratorStartupOptions, keyof IStartupRecord>, 'startup');
}
