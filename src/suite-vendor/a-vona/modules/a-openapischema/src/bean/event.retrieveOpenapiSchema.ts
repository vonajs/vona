import type { Constructable } from 'vona';
import { BeanEventBase, Event } from 'vona-module-a-event';
import type { IOpenapiSchema } from '../types/schema.ts';

export interface TypeEventRetrieveOpenapiSchemaData {
  controller: Constructable;
  handlerName: string;
}

export type TypeEventRetrieveOpenapiSchemaResult = IOpenapiSchema;

@Event()
export class EventRetrieveOpenapiSchema extends BeanEventBase<
  TypeEventRetrieveOpenapiSchemaData,
  TypeEventRetrieveOpenapiSchemaResult
> {}
