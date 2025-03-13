import type { VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    passwordDefault:{
      admin: '123456',
      normal:'123456',
    },
    passwordHash: {
      saltlen: 64,
      iterations: 10000,
      keylen: 64,
      digest: 'sha1',
    },
  };
}
