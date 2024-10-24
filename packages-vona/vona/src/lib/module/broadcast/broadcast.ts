import { VonaApplication } from '../../../types/index.js';
import { BroadcastClient } from './broadcastClient.js';

export default function (app: VonaApplication, modules) {
  // broadcast
  app.meta.broadcast = app.bean._newBean(BroadcastClient);

  // all broadcasts
  const ebBroadcasts = (app.meta.broadcasts = {});

  // load broadcasts
  loadBroadcasts();

  function loadBroadcasts() {
    for (const key in modules) {
      const module = modules[key];
      const config = app.meta.configs[module.info.relativeName];
      if (!config.broadcasts) continue;
      for (const broadcastKey in config.broadcasts) {
        const broadcastConfig = config.broadcasts[broadcastKey];
        const fullKey = `${broadcastConfig.module || module.info.relativeName}:${broadcastKey}`;
        if (!ebBroadcasts[fullKey]) ebBroadcasts[fullKey] = [];
        // bean
        const implementationName = broadcastConfig.bean;
        if (!implementationName) {
          throw new Error(`bean not set for broadcast: ${module.info.relativeName}.${broadcastKey}`);
        }
        let bean;
        if (typeof implementationName === 'string') {
          bean = {
            module: module.info.relativeName,
            name: implementationName,
          };
        } else {
          bean = {
            module: implementationName.module || module.info.relativeName,
            name: implementationName.name,
          };
        }
        ebBroadcasts[fullKey].push({
          bean,
          config: broadcastConfig,
        });
      }
    }
  }
}
