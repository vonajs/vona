import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import { createApp } from './createApp.ts';

export async function bootstrap(bootstrapOptions: BootstrapOptions) {
  return await createApp(bootstrapOptions);
}
