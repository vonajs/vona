import type { VonaApplication } from 'vona';
import type { IOpenapiOptionsResourceMeta } from 'vona-module-a-openapi';

export function config(_app: VonaApplication) {
  return {
    resourceMeta: {} as IOpenapiOptionsResourceMeta,
    permission: {
      actionsIgnore: ['select'],
    },
  };
}
