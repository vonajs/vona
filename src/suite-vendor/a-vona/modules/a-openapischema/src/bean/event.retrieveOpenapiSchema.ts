import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventRetrieveOpenapiSchemaData = unknown;

export type TypeEventRetrieveOpenapiSchemaResult = void;

@Event()
export class EventRetrieveOpenapiSchema extends BeanEventBase<
  TypeEventRetrieveOpenapiSchemaData,
  TypeEventRetrieveOpenapiSchemaResult
> {}
