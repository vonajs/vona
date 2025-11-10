import type { ILocaleInfoRecord } from '../bean/resource/locale/type.ts';

export interface ICustomKeyRecord {
  'x-vona-locale': keyof ILocaleInfoRecord | undefined;
  'x-vona-instance-name': string | undefined;
  'x-vona-passport-code': string | undefined;
  'x-vona-oauth-code': string | undefined;
  'x-vona-openapi-schema': 'true' | 'false' | undefined;
}

export function $customKey<K extends keyof ICustomKeyRecord>(key: K): K {
  return key;
}
