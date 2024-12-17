import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventFileDownloadCheckData = { file; user };

export type TypeEventFileDownloadCheckResult = boolean;

@Event()
export class EventFileDownloadCheck extends BeanEventBase<
  TypeEventFileDownloadCheckData,
  TypeEventFileDownloadCheckResult
> {}
