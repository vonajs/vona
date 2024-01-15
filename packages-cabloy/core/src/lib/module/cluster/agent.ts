import { CabloyApplication, EnumAppEvent } from '../../../type/index.js';

export default function (app: CabloyApplication) {
  // ready
  let _ready = false;
  const pids = {};

  // messenger
  app.meta.messenger.addProvider({
    name: 'appReady',
    handler: data => {
      pids[data.pid] = true;
      if (!_ready) {
        _ready = true;
        // for agent: event: appReady
        app.emit(EnumAppEvent.AppReady);
      }
    },
  });
}
