import type { EntityAuthProvider, IAuthenticateState, IAuthProviderClientOptions } from 'vona-module-a-auth';
import type { IAuthUserProfile, IPassportBase } from 'vona-module-a-user';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventIssuePassportData {
  passport: IPassportBase;
  profileUser: IAuthUserProfile;
  entityAuthProvider: EntityAuthProvider;
  clientOptions: IAuthProviderClientOptions;
  state?: IAuthenticateState;
}

export type TypeEventIssuePassportResult = void;

@Event()
export class EventIssuePassport extends BeanEventBase<
  TypeEventIssuePassportData,
  TypeEventIssuePassportResult
> {}
