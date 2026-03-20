import type {
  ISchemaObjectExtensionFieldRest,
  ISchemaObjectExtensionFieldRestScene,
  TypeRenderComponent,
  TypeSchemaScene,
} from 'vona-module-a-openapi';
import type z from 'zod';

import type { TypeSchemaOrderLevel } from '../../../types/order.ts';

import { $order } from '../../utils.ts';
import { _generalSchemaRest } from './utils.ts';

export function schemaRest<T extends z.ZodType>(
  rest?: ISchemaObjectExtensionFieldRestScene | ISchemaObjectExtensionFieldRest,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    return _generalSchemaRest(schema, rest, scene);
  };
}

export function schemaCustomKey<T extends z.ZodType>(customKey: string, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = { customKey };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaOrder<T extends z.ZodType>(order: number, level?: TypeSchemaOrderLevel, scene?: TypeSchemaScene) {
  const orderReal = $order(order, level);
  return function (schema: T): T {
    const options = { order: orderReal };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRender<T extends z.ZodType>(render: TypeRenderComponent, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = { render };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaVisible<T extends z.ZodType>(visible?: boolean, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = { visible };
    return _generalSchemaRest(schema, options, scene);
  };
}
