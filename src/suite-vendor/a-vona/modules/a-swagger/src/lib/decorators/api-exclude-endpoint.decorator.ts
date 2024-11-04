import { DECORATORS } from '../constants.js';
import { createMethodDecorator } from './helpers.js';

export function ApiExcludeEndpoint(disable = true): MethodDecorator {
  return createMethodDecorator(DECORATORS.API_EXCLUDE_ENDPOINT, {
    disable,
  });
}
