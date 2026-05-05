import type {
  IResourceActionBulkRecord,
  IResourceActionRowRecord,
  IResourceComponentActionBulkOptionsAction,
  IResourceComponentActionRowOptionsAction,
  IResourceComponentBlockOptionsBlock,
  IResourceComponentBlockRecord,
  IResourceComponentFormFieldRecord,
  IResourceComponentTableCellActionRowRecord,
  ISchemaRenderComponentLayoutOptions,
  TypeFormSchemaScene,
  TypeRenderComponentJsx,
  TypeSchemaScene,
} from 'vona-module-a-openapi';
import type z from 'zod';

import { toUpperCaseFirstChar } from '@cabloy/word-utils';

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

export function schemaRenderField<
  K extends keyof IResourceComponentFormFieldRecord,
  T extends z.ZodType,
>(name: K, options?: IResourceComponentFormFieldRecord[K], scene?: TypeFormSchemaScene) {
  return function (schema: T): T {
    const options2 =
      options !== undefined
        ? { render: name as never, preset: { [name]: options } }
        : { render: name as never };
    return _generalSchemaRest(schema, options2, scene ?? 'form'); // diff from table
  };
}

export function schemaRenderFieldJsx<T extends z.ZodType>(
  renderComponentJsx: TypeRenderComponentJsx,
  scene?: TypeFormSchemaScene,
) {
  return function (schema: T): T {
    const options = { render: renderComponentJsx };
    return _generalSchemaRest(schema, options, scene ?? 'form'); //diff from table
  };
}

export function schemaRenderCell<
  K extends keyof IResourceComponentTableCellActionRowRecord,
  T extends z.ZodType,
>(name: K, options?: IResourceComponentTableCellActionRowRecord[K]) {
  return function (schema: T): T {
    const options2 =
      options !== undefined ? { render: name as never, options } : { render: name as never };
    return _generalSchemaRest(schema, options2, 'table');
  };
}

export function schemaRenderCellJsx<T extends z.ZodType>(
  renderComponentJsx: TypeRenderComponentJsx,
) {
  return function (schema: T): T {
    const options = { render: renderComponentJsx };
    return _generalSchemaRest(schema, options, 'table');
  };
}

export function schemaRenderActionRow<K extends keyof IResourceActionRowRecord>(
  name: K,
  options?: IResourceActionRowRecord[K],
): IResourceComponentActionRowOptionsAction {
  const render = 'Action' + toUpperCaseFirstChar(name);
  return { $$typeof: 'zova-jsx:actionRow', name, render: render as any, options };
}

export function schemaRenderActionRowJsx<K extends keyof IResourceActionRowRecord>(
  name: K,
  renderComponentJsx: TypeRenderComponentJsx,
) {
  return { name, render: renderComponentJsx };
}

export function schemaRenderActionBulk<K extends keyof IResourceActionBulkRecord>(
  name: K,
  options?: IResourceActionBulkRecord[K],
): IResourceComponentActionBulkOptionsAction {
  const render = 'Action' + toUpperCaseFirstChar(name);
  return { $$typeof: 'zova-jsx:actionBulk', name, render: render as any, options };
}

export function schemaRenderActionBulkJsx<K extends IResourceActionBulkRecord>(
  name: K,
  renderComponentJsx: TypeRenderComponentJsx,
) {
  return { name, render: renderComponentJsx };
}

export function schemaRenderBlock<K extends keyof IResourceComponentBlockRecord>(
  name: K,
  options?: IResourceComponentBlockRecord[K],
): IResourceComponentBlockOptionsBlock {
  return { $$typeof: 'zova-jsx:block', render: name, options };
}

export function schemaRenderBlockJsx(renderComponentJsx: TypeRenderComponentJsx) {
  return { render: renderComponentJsx };
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
