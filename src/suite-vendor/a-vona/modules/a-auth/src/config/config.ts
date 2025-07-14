import type { VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    oauthCodeField: 'x-vona-oauth-code',
  };
}
