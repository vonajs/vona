import { DECORATORS } from '../constants.js';
import { createClassDecorator } from './helpers';

export function ApiExcludeController(disable = true): ClassDecorator {
  return createClassDecorator(DECORATORS.API_EXCLUDE_CONTROLLER, [disable]);
}
