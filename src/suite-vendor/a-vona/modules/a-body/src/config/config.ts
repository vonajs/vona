import type { VonaApplication } from 'vona';
import type { BodyParserOptions } from '../types/bodyParser.ts';

export function config(_app: VonaApplication) {
  return {
    parser: {
      enableTypes: ['json', 'form'],
      encoding: 'utf8',
      formLimit: '20mb',
      jsonLimit: '20mb',
      textLimit: '20mb',
      xmlLimit: '20mb',
      jsonStrict: true,
      detectJSON: undefined,
      parsedMethods: ['POST', 'PUT', 'PATCH'],
      extendTypes: {},
    } as BodyParserOptions,
  };
}
