import type { ICustomKeyRecord, IInstanceRecord, VonaApplication, VonaContext } from 'vona';
import { $customKey } from 'vona';

export interface IInstanceConfig {
  getInstanceName?: (ctx: VonaContext) => keyof IInstanceRecord | undefined | null;
  queryField?: keyof ICustomKeyRecord;
  headerField?: keyof ICustomKeyRecord;
}

export function config(_app: VonaApplication) {
  return {
    queryField: $customKey('x-vona-instance-name'),
    headerField: $customKey('x-vona-instance-name'),
  } as IInstanceConfig;
}
