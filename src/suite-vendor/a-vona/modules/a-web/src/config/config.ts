import type Router from 'find-my-way';
import type { Config } from 'find-my-way';
import type { VonaApplication } from 'vona';

export function config(_app: VonaApplication) {
  return {
    router: {
    } as Config<Router.HTTPVersion.V1>,
  };
}
