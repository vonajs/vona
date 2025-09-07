import type { IUserBase } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventRegisterData {
  user: Partial<IUserBase>;
  confirmed?: boolean;
  autoActivate?: boolean;
}

export type TypeEventRegisterResult = Partial<IUserBase>;

@Event()
export class EventRegister extends BeanEventBase<
  TypeEventRegisterData,
  TypeEventRegisterResult
> {}
