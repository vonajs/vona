import type { VonaAppInfo } from '../../types/application/app.ts';
import type { VonaApplication } from '../core/application.ts';

export function getRedisClientKeyPrefix(clientName: string, appInfo: VonaAppInfo | VonaApplication): string {
  const mode = ['test', 'dev'].includes(appInfo.configMeta.mode) ? '_local' : '';
  return `${clientName}_${appInfo.name}${mode}:`;
}
