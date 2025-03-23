import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { IDecoratorEventOptions } from 'vona-module-a-event';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';

/** bean: end */
/** bean: begin */
import type { BeanAuthInner } from '../bean/bean.authInner.ts';
import type { BeanPassport } from '../bean/bean.passport.ts';
import type { BeanUserInner } from '../bean/bean.userInner.ts';
/** event: end */
/** event: begin */
import type { EventCreateUserAnonymous } from '../bean/event.createUserAnonymous.ts';
import type { EventSignin } from '../bean/event.signin.ts';

import type { EventSignout } from '../bean/event.signout.ts';
/** guard: end */
/** bean: begin */
import type { IGuardOptionsAdmin } from '../bean/guard.admin.ts';
import type { IGuardOptionsPassport } from '../bean/guard.passport.ts';
import type { config } from '../config/config.ts';

/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';

import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.authInner.ts';
export * from '../bean/bean.passport.ts';
declare module 'vona-module-a-aspect' {

  export interface IGuardRecordGlobal {
    'a-user:passport': IGuardOptionsPassport;
  }

  export interface IGuardRecordLocal {
    'a-user:admin': IGuardOptionsAdmin;
  }

}
declare module 'vona-module-a-user' {

  export interface GuardAdmin {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }

  export interface GuardPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
export * from '../bean/bean.userInner.ts';
/** bean: end */
/** event: begin */
export * from '../bean/event.createUserAnonymous.ts';
export * from '../bean/event.signin.ts';
declare module 'vona' {

}
declare module 'vona-module-a-user' {

  export interface BeanAuthInner {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }

  export interface BeanPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }

  export interface BeanUserInner {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authInner: BeanAuthInner;
    passport: BeanPassport;
    userInner: BeanUserInner;
  }
}
export * from '../bean/event.signout.ts';
/** guard: begin */
export * from '../bean/guard.admin.ts';
export * from '../bean/guard.passport.ts';
declare module 'vona-module-a-event' {

  export interface IEventRecord {
    'a-user:createUserAnonymous': IDecoratorEventOptions;
    'a-user:signin': IDecoratorEventOptions;
    'a-user:signout': IDecoratorEventOptions;
  }

}
declare module 'vona-module-a-user' {

  export interface EventCreateUserAnonymous {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }

  export interface EventSignin {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }

  export interface EventSignout {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
export interface IModuleEvent {
  createUserAnonymous: EventCreateUserAnonymous;
  signin: EventSignin;
  signout: EventSignout;
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.printTip.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-user:printTip': never;
  }

}
declare module 'vona-module-a-user' {

  export interface MetaPrintTip {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona' {

  export interface IDtoRecord {
    'a-user:jwtToken': never;
  }

}
declare module 'vona-module-a-user' {

}
/** dto: end */
/** controller: begin */
export * from '../controller/passport.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'a-user:passport': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-a-user' {

  export interface ControllerPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathPostRecord {
    '/user/passport/refreshAuthToken': '/user/passport/refreshAuthToken';
    '/user/passport/createAuthTokenFromOauthCode': '/user/passport/createAuthTokenFromOauthCode';
  }

}
/** meta: end */
/** dto: begin */
export * from '../dto/jwtToken.ts';

@Scope()
export class ScopeModuleAUser extends BeanScopeBase {}

export interface ScopeModuleAUser {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  event: IModuleEvent;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-user': ScopeModuleAUser;
  }

  export interface IBeanScopeContainer {
    user: ScopeModuleAUser;
  }

  export interface IBeanScopeConfig {
    'a-user': ReturnType<typeof config>;
  }

}

/** scope: end */
