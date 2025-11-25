import type { VonaAppInfo, VonaApplication } from 'vona';

export function getRedisClientKeyPrefix(clientName: string, appInfo: VonaAppInfo | VonaApplication): string {
  const mode = ['test', 'dev'].includes(appInfo.configMeta.mode) ? '_local' : '';
  return `${clientName}_${appInfo.name}${mode}:`;
}

export function prepareRedisClientKeyPrefix(
  keyPrefix: string | true | undefined,
  clientName: string,
  appInfo: VonaAppInfo | VonaApplication,
): string | undefined {
  return keyPrefix === true ? getRedisClientKeyPrefix(clientName, appInfo) : keyPrefix;
}
