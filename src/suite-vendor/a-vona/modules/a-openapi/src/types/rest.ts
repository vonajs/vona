import type { ZodOpenAPIMetadata } from '@cabloy/zod-to-openapi';
import type { ILocaleMagic } from 'vona';
import type { IOpenapiOptions } from 'vona-module-a-openapiutils';
import type { z } from 'zod';

import type { IComponentRecord, ITableCellComponentRecord } from './component.ts';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export type TypeFormFieldOnSetDisplayValue = (value: any) => any;
export type TypeFormFieldDisplayValueUpdateTiming = 'input' | 'change';

export interface ISchemaRenderComponentPresetRecord {}

export interface ISchemaObjectExtensionFieldRestProps {
  customKey?: string;
  visible?: boolean;
  order?: number;
  //
  classContainer?: any;
  label?: string | false;
  inline?: boolean;
  bordered?: boolean;
  floating?: boolean;
  iconPrefix?: string;
  iconSuffix?: string;
  header?: TypeRenderComponentJsx | string;
  footer?: TypeRenderComponentJsx | string;
  //
  displayValue?: any;
  displayValueUpdateTiming?: TypeFormFieldDisplayValueUpdateTiming;
  onSetDisplayValue?: TypeFormFieldOnSetDisplayValue;
  disableNotifyChanged?: boolean;
  class?: any;
  readonly?: boolean;
  //
  preset?: ISchemaRenderComponentPresetRecord;
}

export interface ISchemaObjectExtensionFieldRest extends ISchemaObjectExtensionFieldRestProps {
  render?: TypeRenderComponentPreset;
  table?: ISchemaObjectExtensionFieldRestScene;
  form?: ISchemaObjectExtensionFieldRestScene;
  filter?: ISchemaObjectExtensionFieldRestScene;
}

export interface ISchemaObjectExtensionFieldRestScene extends ISchemaObjectExtensionFieldRestProps {
  render?: TypeRenderComponent;
}

export interface ISchemaObjectExtensionField {
  rest?: ISchemaObjectExtensionFieldRest;
}

declare module 'openapi3-ts/oas30' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

declare module 'openapi3-ts/oas31' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

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

export type TypeSchemaScene = 'table' | 'form' | 'filter';

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
export type TypeFormFieldRenderComponentProvider = keyof IComponentRecord | 'input' | 'textarea' | 'select';

// table
export type TypeTableCellRenderComponentProvider = keyof IComponentRecord | keyof ITableCellComponentRecord | 'text';

export type TypeOpenapiMetadata<T extends z.ZodType = z.ZodType> = Omit<Partial<ZodOpenAPIMetadata<z.input<T>>>, 'title' | 'description'> & {
  title?: string | ILocaleMagic;
  description?: string | ILocaleMagic;
};

export type TypeEntityOptionsFields<T extends {}, More extends string | undefined = never> = {
  [key in keyof T | (More extends string ? More : never)]?: TypeOpenapiMetadata | z.ZodType;
};

export type TypeControllerOptionsActions<T extends {}> = {
  [key in keyof T]?: IOpenapiOptions;
};
