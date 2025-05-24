import type { ZodOpenAPIMetadata } from '@asteasolutions/zod-to-openapi';
import type { CurrencyOptions } from '@zhennann/currency';
import type { z, ZodTypeAny } from 'zod';
import type { TypeResourceActionRowRecordRender } from './actions.ts';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeRenderComponent;
  currency?: CurrencyOptions | boolean;
  visible?: boolean;
  order?: number;
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

export interface IComponentRecord {}

export type TypeRenderComponent =
  (keyof IComponentRecord) | (keyof TypeResourceActionRowRecordRender) | 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'image' | 'file' | 'color' | 'password' | 'email' | 'url';

export type TypeRenderComponentProvider = (keyof IComponentRecord) | (keyof TypeResourceActionRowRecordRender) | 'input' | 'textarea' | 'select';

export type TypeSchemaScene = 'table' | 'form';

export type TypeOpenAPIMetadata<T extends ZodTypeAny = ZodTypeAny> = Partial<ZodOpenAPIMetadata<z.input<T>>>;

export type TypeEntityOptionsFields<T extends {}, More extends string | undefined = never> = {
  [key in ((keyof Omit<T, '$column' | '$columns' | '$table'>) | (More extends string ? More : never))]?: TypeOpenAPIMetadata | z.ZodSchema;
};
