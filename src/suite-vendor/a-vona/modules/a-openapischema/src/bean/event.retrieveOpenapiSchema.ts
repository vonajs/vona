import type { ContextRoute } from 'vona-module-a-web';
import type { IOpenapiSchema } from '../types/schema.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventRetrieveOpenapiSchemaData {
  route: ContextRoute;
}

export type TypeEventRetrieveOpenapiSchemaResult = IOpenapiSchema;

@Event()
export class EventRetrieveOpenapiSchema extends BeanEventBase<
  TypeEventRetrieveOpenapiSchemaData,
  TypeEventRetrieveOpenapiSchemaResult
> {}
