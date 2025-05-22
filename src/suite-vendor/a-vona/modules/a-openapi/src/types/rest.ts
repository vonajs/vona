import type { CurrencyOptions } from '@zhennann/currency';
import type { TypeResourceActionRowRecordRender } from './actions.ts';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeRenderComponent;
  currency?: CurrencyOptions | boolean;
  table?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
  form?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
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

export type TypeRenderComponent =
  keyof TypeResourceActionRowRecordRender | string;
