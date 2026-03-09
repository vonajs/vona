import type { VonaApplication } from 'vona';
import { $customKey } from 'vona';

export function config(_app: VonaApplication) {
  return {
    oauthCodeField: $customKey('x-vona-oauth-code'),
  };
}
