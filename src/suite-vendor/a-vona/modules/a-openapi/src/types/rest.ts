import type { ZodOpenAPIMetadata } from '@asteasolutions/zod-to-openapi';
import type { CurrencyOptions } from '@zhennann/currency';
import type { IOpenApiOptions } from 'vona-module-a-openapiutils';
import type { z, ZodTypeAny } from 'zod';
import type { TypeResourceActionRowRecordRender } from './actions.ts';
import type { IComponentRecord } from './component.ts';
import type { ISchemaObjectExtensionFieldQuery } from './query.ts';
import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: TypeFieldRenderComponent;
  currency?: CurrencyOptions | boolean;
  visible?: boolean;
  order?: number;
  table?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
  form?: Omit<ISchemaObjectExtensionFieldRest, 'table' | 'form'>;
}

export interface ISchemaObjectExtensionField {
  rest?: ISchemaObjectExtensionFieldRest;
  query?: ISchemaObjectExtensionFieldQuery;
}

declare module 'openapi3-ts/oas30' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

declare module 'openapi3-ts/oas31' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

export type TypeFieldRenderComponent =
  (keyof IComponentRecord) | (keyof TypeResourceActionRowRecordRender) | 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'image' | 'file' | 'color' | 'password' | 'email' | 'url';

export type TypeFieldRenderComponentProvider = (keyof IComponentRecord) | (keyof TypeResourceActionRowRecordRender) | 'input' | 'textarea' | 'select';

export type TypeSchemaScene = 'table' | 'form';

export type TypeOpenapiMetadata<T extends ZodTypeAny = ZodTypeAny> = Partial<ZodOpenAPIMetadata<z.input<T>>>;

export type TypeEntityOptionsFields<T extends {}, More extends string | undefined = never> = {
  [key in ((keyof T) | (More extends string ? More : never))]?: TypeOpenapiMetadata | z.ZodSchema;
};

export type TypeControllerOptionsActions<T extends {}> = {
  [key in (keyof T)]?: IOpenApiOptions;
};
