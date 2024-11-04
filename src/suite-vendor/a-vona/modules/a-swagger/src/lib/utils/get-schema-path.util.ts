import { isString } from '@nestjs/common/utils/shared.utils.js';
import { DECORATORS } from '../constants.js';
import { ApiSchemaOptions } from '../decorators/api-schema.decorator.js';
import { Constructable } from 'vona';

export function getSchemaPath(model: string | Constructable): string {
  const modelName = isString(model) ? model : getSchemaNameByClass(model);
  return `#/components/schemas/${modelName}`;
}

function getSchemaNameByClass(target: Constructable): string {
  if (!target || typeof target !== 'function') {
    return '';
  }

  const customSchema: ApiSchemaOptions[] = Reflect.getOwnMetadata(DECORATORS.API_SCHEMA, target);

  if (!customSchema || customSchema.length === 0) {
    return target.name;
  }

  return customSchema[0].name ?? target.name;
}

export function refs(...models: Constructable[]) {
  return models.map(item => ({
    $ref: getSchemaPath(item.name),
  }));
}
