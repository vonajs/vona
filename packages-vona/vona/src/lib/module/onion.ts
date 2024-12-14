import { IDecoratorMetaOptions, IMetaRecord, VonaApplication } from '../../types/index.js';
import { Onion } from './onion/onion.js';

export default function (app: VonaApplication) {
  loadAll(app);
}

function loadAll(app: VonaApplication) {
  app.meta.onionMeta = app.bean._newBean(Onion<IDecoratorMetaOptions, keyof IMetaRecord>, 'meta');
}
