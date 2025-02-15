/** config: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';

import type { IDecoratorEventOptions } from 'vona-module-a-event';
/** bean: end */
/** bean: begin */
import type { BeanPassport } from '../bean/bean.passport.js';
/** event: end */
/** event: begin */
import type { EventCreateUserAnonymous } from '../bean/event.createUserAnonymous.js';

import type { EventSignin } from '../bean/event.signin.js';
import type { EventSignout } from '../bean/event.signout.js';
/** guard: end */
/** bean: begin */
import type { IGuardOptionsPassport } from '../bean/guard.passport.js';
import type { config } from '../config/config.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.passport.js';
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
/** bean: end */
/** event: begin */
export * from '../bean/event.createUserAnonymous.js';
declare module 'vona' {}
declare module 'vona-module-a-user' {
  export interface BeanPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    passport: BeanPassport;
  }
}
export * from '../bean/event.signin.js';
export * from '../bean/event.signout.js';
/** guard: begin */
export * from '../bean/guard.passport.js';
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
/** config: begin */
export * from '../config/config.js';

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
