import { VonaApplication } from '../../types/application/app.js';

export default function (app: VonaApplication) {
  // eb_clear
  app.messenger.once('eb_clear', async data => {
    await app.meta.close();
    (<any>process).send({ to: 'master', action: 'eb_clear_done', data: { id: data.id } });
  });
}
