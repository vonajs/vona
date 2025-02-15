import type { IMetaVersionOptions } from '../types/version.js';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventVersionDoneData = IMetaVersionOptions;

export type TypeEventVersionDoneResult = void;

@Event()
export class EventVersionDone extends BeanEventBase<TypeEventVersionDoneData, TypeEventVersionDoneResult> {}
