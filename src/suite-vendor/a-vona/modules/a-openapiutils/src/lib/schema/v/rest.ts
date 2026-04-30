import type {
  ISchemaObjectExtensionFieldRestScene,
  ISchemaRenderComponentLayoutOptions,
  ISchemaRenderComponentPresetRecord,
  TypeRenderComponentJsx,
  TypeSchemaScene,
} from 'vona-module-a-openapi';
import type { IResourceActionRowOptionsOperationsRowAction } from 'vona-module-basic-openapi';
import type z from 'zod';

import type { TypeSchemaOrderLevel } from '../../../types/order.ts';

import { $order } from '../../utils.ts';
import { _generalSchemaRest } from './utils.ts';

export function schemaRenderLayout<T extends z.ZodType>(
  layoutOptions: ISchemaRenderComponentLayoutOptions,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    const options = { layout: layoutOptions };
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderComponent<
  K extends keyof ISchemaRenderComponentPresetRecord,
  T extends z.ZodType,
>(name: K, options?: ISchemaRenderComponentPresetRecord[K], scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options2 = schemaRenderComponentOptions(name, options);
    return _generalSchemaRest(schema, options2, scene);
  };
}

export function schemaRenderComponentOptions<K extends keyof ISchemaRenderComponentPresetRecord>(
  name: K,
  options?: ISchemaRenderComponentPresetRecord[K],
): ISchemaObjectExtensionFieldRestScene {
  return options !== undefined ? { render: name, preset: { [name]: options } } : { render: name };
}

export function schemaRenderComponentNested<K extends keyof ISchemaRenderComponentPresetRecord>(
  name: K,
  options?: ISchemaRenderComponentPresetRecord[K],
): IResourceActionRowOptionsOperationsRowAction {
  const options2 = schemaRenderComponentOptions(name, options);
  return { name, options: options2 };
}

export function schemaRenderJsx<T extends z.ZodType>(
  renderJsx: TypeRenderComponentJsx,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    const options = schemaRenderJsxOptions(renderJsx);
    return _generalSchemaRest(schema, options, scene);
  };
}

export function schemaRenderJsxOptions(renderJsx: TypeRenderComponentJsx) {
  return { render: renderJsx };
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
