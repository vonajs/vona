import { OpenAPIObjectConfig } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator.js';
import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    generateDocument: {
      openapi: '3.0.0',
      info: {
        version: '5.0.0',
        title: 'Vona',
        description: 'Vona API',
      },
    } as OpenAPIObjectConfig,
  };
};
