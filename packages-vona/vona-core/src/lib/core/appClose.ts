import { VonaApplication } from '../../types/application/app.js';
import { cast } from '../../types/utils/cast.js';

export default function (app: VonaApplication) {
  // eb_clear
  app.messenger.once('eb_clear', async data => {
    await cast(app.bean._getBean('a-queue.service.queue' as any)).clearWorkers();
    (<any>process).send({ to: 'master', action: 'eb_clear_done', data: { id: data.id } });
  });
}
