import type { OpenApiOptions } from '@cabloy/zod-to-openapi/dist/zod-extensions.js';
import type { SchemaObject } from 'openapi3-ts/oas31';

import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';
import type { ILocaleMagic } from 'vona';
import type { IOpenapiOptions } from 'vona-module-a-openapiutils';
import type { core, z } from 'zod';

import type { IComponentRecord, ITableCellComponentRecord } from './component.ts';
import type { IResourceComponentFormFieldRecord } from './formField.ts';

export interface ISchemaRenderComponentPresetRecord extends IResourceComponentFormFieldRecord {}

export interface ISchemaObjectExtensionFieldRestProps {
  //
  fieldSource?: string;
  visible?: boolean;
  order?: number;
  disableNotifyChanged?: boolean;
  readonly?: boolean;
}

export interface ISchemaObjectExtensionFieldRest extends ISchemaObjectExtensionFieldRestProps {
  'render'?: TypeRenderComponentPreset;
  'table'?: ISchemaObjectExtensionFieldRestScene;
  'form'?: ISchemaObjectExtensionFieldRestScene;
  'form-view'?: ISchemaObjectExtensionFieldRestScene;
  'form-create'?: ISchemaObjectExtensionFieldRestScene;
  'filter'?: ISchemaObjectExtensionFieldRestScene;
}

export interface ISchemaObjectExtensionFieldRestScene extends ISchemaObjectExtensionFieldRestProps {
  render?: TypeRenderComponent;
}

export interface ISchemaObjectExtensionField extends Omit<SchemaObject, 'title' | 'description'> {
  rest?: ISchemaObjectExtensionFieldRest;
  title?: string | ILocaleMagic;
  description?: string | ILocaleMagic;
}

declare module 'zod' {
  interface ZodType<
    out Output = unknown,
    out Input = unknown,
    out Internals extends core.$ZodTypeInternals<Output, Input> = core.$ZodTypeInternals<
      Output,
      Input
    >,
  > extends core.$ZodType<Output, Input, Internals> {
    openapi(metadata: ISchemaObjectExtensionField, options?: OpenApiOptions): this;
    openapi(refId: string, metadata?: ISchemaObjectExtensionField, options?: OpenApiOptions): this;
  }
}

// export type TypeOpenapiMetadata<_T extends z.ZodType = z.ZodType> = Omit<
//   Partial<ISchemaObjectExtensionField>,
//   'title' | 'description'
// > & {
//   title?: string | ILocaleMagic;
//   description?: string | ILocaleMagic;
// };
// // export type TypeOpenapiMetadata<T extends z.ZodType = z.ZodType> = Omit<
// //   Partial<ZodOpenAPIMetadata<z.input<T>>>,
// //   'title' | 'description'
// // > & {
// //   title?: string | ILocaleMagic;
// //   description?: string | ILocaleMagic;
// // };

export interface TypeRenderComponentJsxProps {
  'children': TypeRenderComponentJsx | TypeRenderComponentJsx[];
  'v-if'?: string | boolean;
  'v-for'?: string | any[];
  'v-each'?: string;
  'v-slot'?: string;
  'v-slot-scope'?: string;
}

export interface TypeRenderComponentJsx {
  type: string;
  key?: string | null;
  props?: TypeRenderComponentJsxProps;
}

export type TypeSchemaScene = 'table' | TypeFormSchemaScene;
export type TypeFormSchemaScene = 'form' | 'form-view' | 'form-create' | 'filter';

export type TypeRenderComponentPreset =
  | keyof ISchemaRenderComponentPresetRecord
  | 'text'
  | 'captcha'
  | 'currency'
  | 'date'
  | 'dateRange'
  | 'toggle'
  | 'select'
  | 'textarea'
  | 'resourcePicker';
// | 'checkbox';
// | 'radio'
// | 'switch';
// | 'image'
// | 'file'
// | 'color'
// | 'password'
// | 'email'
// | 'url';
export type TypeRenderComponent = TypeRenderComponentPreset | TypeRenderComponentJsx;

// form
export type TypeFormFieldRenderComponentProvider = keyof IComponentRecord;
// | 'input'
// | 'textarea'
// | 'select';

// table
export type TypeTableCellRenderComponentProvider =
  | keyof IComponentRecord
  | keyof ITableCellComponentRecord
  | 'text';

export type TypeEntityOptionsFields<T extends {}, More extends string | undefined = never> = {
  [key in keyof T | (More extends string ? More : never)]?: ISchemaObjectExtensionField | z.ZodType;
};

export type TypeControllerOptionsActions<T extends {}> = {
  [key in keyof T]?: IOpenapiOptions;
};
