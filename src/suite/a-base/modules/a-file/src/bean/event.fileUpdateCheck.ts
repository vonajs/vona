import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventFileUpdateCheckData = { file; user };

export type TypeEventFileUpdateCheckResult = boolean;

@Event()
export class EventFileUpdateCheck extends BeanEventBase<TypeEventFileUpdateCheckData, TypeEventFileUpdateCheckResult> {}
