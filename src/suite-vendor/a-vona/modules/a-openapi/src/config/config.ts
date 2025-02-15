import type { OpenAPIObjectConfig as OpenAPIObjectConfigV30 } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator.js';
import type { OpenAPIObjectConfigV31 } from '@asteasolutions/zod-to-openapi/dist/v3.1/openapi-generator.js';
import type { VonaApplication } from 'vona';
import type { TypeOpenApiVersion } from '../types/api.js';

export function config(_app: VonaApplication) {
  return {
    defaultVersion: '31' as TypeOpenApiVersion,
    generateDocument: {
      30: {
        openapi: '3.0.0',
        info: {
          version: '5.0.0',
          title: 'Vona',
          description: 'Vona API',
        },
      } as OpenAPIObjectConfigV30,
      31: {
        openapi: '3.1.0',
        info: {
          version: '5.0.0',
          title: 'Vona',
          description: 'Vona API',
        },
      } as OpenAPIObjectConfigV31,
    },
  };
}
