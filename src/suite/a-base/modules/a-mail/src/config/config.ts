// startups
const startups = {
  cacheMailScenes: {
    bean: 'cacheMailScenes',
    instance: true,
  },
};

// broadcasts
const broadcasts = {
  mailSceneChanged: {
    bean: 'mailSceneChanged',
  },
};

const sceneDefault = {
  // title: undefined,
  transport: {
    host: '',
    port: 0,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
    logger: false,
    debug: false,
  },
  defaults: {
    from: '',
  },
};

import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    startups,
    broadcasts,
    // default
    scene: {
      default: sceneDefault,
    },
    // scenes
    scenes: {
      system: {
        title: 'System',
        ...sceneDefault,
      },
    },
  };
};
