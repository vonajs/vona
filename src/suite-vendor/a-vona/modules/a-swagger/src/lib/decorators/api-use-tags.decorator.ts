import { DECORATORS } from '../constants.js';
import { createMixedDecorator } from './helpers';

export function ApiTags(...tags: string[]) {
  return createMixedDecorator(DECORATORS.API_TAGS, tags);
}
