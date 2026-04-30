import type {
  IResourceActionBulkOptionsOperationsBulkAction,
  IResourceActionBulkRecord,
  IResourceActionRowOptionsOperationsRowAction,
  IResourceActionRowRecord,
  ISchemaObjectExtensionFieldRestScene,
  ISchemaRenderComponentLayoutOptions,
  ISchemaRenderComponentPresetRecord,
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

export function schemaRenderComponent<
  K extends keyof ISchemaRenderComponentPresetRecord,
  T extends z.ZodType,
>(name: K, options?: ISchemaRenderComponentPresetRecord[K], scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options2 = schemaRenderComponentOptions(name, options);
    return _generalSchemaRest(schema, options2, scene);
  };
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

export function schemaRenderComponentRow<
  K extends keyof Omit<IResourceActionRowRecord, 'operationsRow'>,
>(name: K, options?: IResourceActionRowRecord[K]): IResourceActionRowOptionsOperationsRowAction {
  const options2 = schemaRenderComponentOptions('action' + toUpperCaseFirstChar(name), options);
  return { name, options: options2 };
}

export function schemaRenderComponentBulk<
  K extends keyof Omit<IResourceActionBulkRecord, 'operationsBulk'>,
>(name: K, options?: IResourceActionBulkRecord[K]): IResourceActionBulkOptionsOperationsBulkAction {
  const options2 = schemaRenderComponentOptions('action' + toUpperCaseFirstChar(name), options);
  return { name, options: options2 };
}

export function schemaRenderJsxRow<K extends keyof Omit<IResourceActionRowRecord, 'operationsRow'>>(
  name: K,
  renderJsx: TypeRenderComponentJsx,
) {
  const options = schemaRenderJsxOptions(renderJsx);
  return { name, options };
}

export function schemaRenderJsxBulk<
  K extends keyof Omit<IResourceActionBulkRecord, 'operationsBulk'>,
>(name: K, renderJsx: TypeRenderComponentJsx) {
  const options = schemaRenderJsxOptions(renderJsx);
  return { name, options };
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

function schemaRenderComponentOptions(
  name: string,
  options?: {},
): ISchemaObjectExtensionFieldRestScene {
  return options !== undefined
    ? { render: name as never, preset: { [name]: options } }
    : { render: name as never };
}

function schemaRenderJsxOptions(renderJsx: TypeRenderComponentJsx) {
  return { render: renderJsx };
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
