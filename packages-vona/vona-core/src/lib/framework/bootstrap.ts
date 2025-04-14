import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import type { VonaApplication } from '../core/application.ts';
import { prepareEnv } from '../utils/util.ts';
import { startCluster } from './cluster.ts';
import { createApp } from './createApp.ts';
import { handleProcessWork } from './process.ts';

export async function bootstrap(bootstrapOptions: BootstrapOptions): Promise<VonaApplication | undefined> {
  const env = prepareEnv(bootstrapOptions.env);
  const workers = Number.parseInt(env.SERVER_WORKERS!);
  if (workers === 1) {
    handleProcessWork();
    return await createApp(bootstrapOptions);
  }
  await startCluster(workers, bootstrapOptions);
}
