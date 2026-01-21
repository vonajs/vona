import type { VonaApplication } from 'vona';
import type { IOpenApiOptionsResourceMeta } from 'vona-module-a-openapi';

export function config(_app: VonaApplication) {
  return {
    resourceMeta: {} as IOpenApiOptionsResourceMeta,
  };
}
