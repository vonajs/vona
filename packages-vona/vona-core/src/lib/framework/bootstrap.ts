import type { VonaApplication } from 'vona';
import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import { handleProcess } from 'vona';
import { startCluster } from './cluster.ts';
import { createApp } from './createApp.ts';

export async function bootstrap(bootstrapOptions: BootstrapOptions): Promise<VonaApplication | undefined> {
  const workers = Number.parseInt(process.env.SERVER_WORKERS!);
  if (workers === 1) {
    handleProcess();
    return await createApp(bootstrapOptions);
  }
  await startCluster(workers, bootstrapOptions);
}
