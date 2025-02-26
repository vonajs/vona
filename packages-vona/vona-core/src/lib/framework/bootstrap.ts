import type { VonaApplication } from 'vona';
import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import { startCluster } from './cluster.ts';
import { createApp } from './createApp.ts';

export async function bootstrap(bootstrapOptions: BootstrapOptions): Promise<VonaApplication | undefined> {
  const workers = Number.parseInt(process.env.SERVER_WORKERS!);
  if (workers === 1) {
    return await createApp(bootstrapOptions);
  }
  await startCluster(workers, bootstrapOptions);
}
