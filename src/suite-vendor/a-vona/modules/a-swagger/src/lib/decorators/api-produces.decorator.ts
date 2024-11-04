import { DECORATORS } from '../constants.js';
import { createMixedDecorator } from './helpers';

export function ApiProduces(...mimeTypes: string[]) {
  return createMixedDecorator(DECORATORS.API_PRODUCES, mimeTypes);
}
