/** guard: begin */
export * from '../bean/guard.passport.js';
import { IGuardOptionsPassport } from '../bean/guard.passport.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IGuardRecordGlobal {
    'a-user:passport': IGuardOptionsPassport;
  }
}
declare module 'vona-module-a-user' {
  export interface GuardPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
/** guard: end */
/** bean: begin */
export * from '../bean/bean.passport.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-user' {
  export interface BeanPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
/** bean: end */
/** bean: begin */
import { BeanPassport } from '../bean/bean.passport.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    passport: BeanPassport;
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.createUserAnonymous.js';
export * from '../bean/event.signin.js';
export * from '../bean/event.signout.js';

import { IDecoratorEventOptions } from 'vona-module-a-event';
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
/** event: end */
/** event: begin */
import { EventCreateUserAnonymous } from '../bean/event.createUserAnonymous.js';
import { EventSignin } from '../bean/event.signin.js';
import { EventSignout } from '../bean/event.signout.js';
export interface IModuleEvent {
  createUserAnonymous: EventCreateUserAnonymous;
  signin: EventSignin;
  signout: EventSignout;
}
/** event: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAUser extends BeanScopeBase {}

export interface ScopeModuleAUser {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  event: IModuleEvent;
}

import 'vona';
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
