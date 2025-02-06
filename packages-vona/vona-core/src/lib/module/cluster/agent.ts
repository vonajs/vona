import { VonaApplication, EnumAppEvent } from '../../../types/index.js';

export default function (app: VonaApplication) {
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
        // for agent: event: appStarted
        app.emit(EnumAppEvent.AppStarted);
      }
    },
  });
}
