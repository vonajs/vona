import type { VonaApplication } from 'vona';

import { $customKey } from 'vona';

export function config(_app: VonaApplication) {
  return {
    eventPrefix: '_:',
    globalPrefix: '/ws',
    queryKey: {
      passportCode: $customKey('x-vona-passport-code'),
      instanceName: $customKey('x-vona-instance-name'),
      locale: $customKey('x-vona-locale'),
      tz: $customKey('x-vona-tz'),
    },
    timeout: {
      ping: 20000,
    },
  };
}
