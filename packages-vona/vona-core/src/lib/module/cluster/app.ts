import { cast, VonaApplication } from '../../../types/index.js';
import { VersionReady } from '../version/ready.js';

export default function (app: VonaApplication) {
  const versionReady = app.bean._newBean(VersionReady);
  // initialize
  versionReady.initialize();
  // eb_clear
  app.messenger.once('eb_clear', async data => {
    await cast(app.bean._getBean('a-queue.service.queue' as any)).clearWorkers();
    (<any>process).send({ to: 'master', action: 'eb_clear_done', data: { id: data.id } });
  });
}

// maybe cause some resources initialized more times
// async function __versionReady(app) {
//   try {
//     await versionReady(app);
//   } catch (err) {
//     console.error(err);
//     setTimeout(async () => {
//       await __versionReady(app);
//     }, app.config.versionReady.retry.timeout);
//   }
// }
