import type {
  ISchemaRenderComponentLayoutOptions,
  TypeFormSchemaScene,
  TypeSchemaOrderLevel,
  TypeSchemaScene,
} from 'vona-module-a-openapi';
import type z from 'zod';

import { $order } from '../../utils.ts';
import { _generalSchemaRest } from './utils.ts';

export function schemaRenderLayout<T extends z.ZodType>(
  layoutOptions: ISchemaRenderComponentLayoutOptions,
  scene?: TypeFormSchemaScene,
) {
  return function (schema: T): T {
    const options = { layout: layoutOptions };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderVisible<T extends z.ZodType>(
  visible?: boolean,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    const options = { visible };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderReadonly<T extends z.ZodType>(
  readonly?: boolean,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    const options = { readonly };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderDisableNotifyChanged<T extends z.ZodType>(
  disableNotifyChanged?: boolean,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    const options = { disableNotifyChanged };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderFieldSource<T extends z.ZodType>(
  fieldSource: string,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    const options = { fieldSource };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderOrder<T extends z.ZodType>(
  order: number,
  level?: TypeSchemaOrderLevel,
  scene?: TypeSchemaScene,
) {
  const orderReal = $order(order, level);
  return function (schema: T): T {
    const options = { order: orderReal };
    return _generalSchemaRest(schema, options, scene);
  };
}

// export function schemaRest<T extends z.ZodType>(
//   rest?: ISchemaObjectExtensionFieldRestScene | ISchemaObjectExtensionFieldRest,
//   scene?: TypeSchemaScene,
// ) {
//   return function (schema: T): T {
//     return _generalSchemaRest(schema, rest, scene);
//   };
// }

// export function schemaRender<T extends z.ZodType>(
//   render: TypeRenderComponent,
//   scene?: TypeSchemaScene,
// ) {
//   return function (schema: T): T {
//     const options = { render };
//     return _generalSchemaRest(schema, options, scene);
//   };
// }
