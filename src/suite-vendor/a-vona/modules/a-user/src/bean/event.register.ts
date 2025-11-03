import type { IUser } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventRegisterData {
  user: Partial<IUser>;
  confirmed?: boolean;
  autoActivate?: boolean;
}

export type TypeEventRegisterResult = Partial<IUser>;

@Event()
export class EventRegister extends BeanEventBase<
  TypeEventRegisterData,
  TypeEventRegisterResult
> {}
