/* eslint-disable */
/** guard: begin */
export * from '../bean/guard.passport.ts';
export * from '../bean/guard.roleName.ts';
export * from '../bean/guard.userName.ts';
import type { IGuardOptionsPassport } from '../bean/guard.passport.ts';
import type { IGuardOptionsRoleName } from '../bean/guard.roleName.ts';
import type { IGuardOptionsUserName } from '../bean/guard.userName.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IGuardRecordGlobal {
      'a-user:passport': IGuardOptionsPassport;
    }

  
export interface IGuardRecordLocal {
  'a-user:roleName': IGuardOptionsRoleName;
'a-user:userName': IGuardOptionsUserName;
}

}
declare module 'vona-module-a-user' {
  
        export interface GuardPassport {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

        export interface GuardRoleName {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

        export interface GuardUserName {
          /** @internal */
          get scope(): ScopeModuleAUser;
        } 
}
/** guard: end */
/** bean: begin */
export * from '../bean/bean.authInner.ts';
export * from '../bean/bean.passport.ts';
export * from '../bean/bean.roleInner.ts';
export * from '../bean/bean.userInner.ts';

import 'vona';
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

        export interface BeanRoleInner {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

        export interface BeanUserInner {
          /** @internal */
          get scope(): ScopeModuleAUser;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanAuthInner } from '../bean/bean.authInner.ts';
import type { BeanPassport } from '../bean/bean.passport.ts';
import type { BeanRoleInner } from '../bean/bean.roleInner.ts';
import type { BeanUserInner } from '../bean/bean.userInner.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'authInner': BeanAuthInner;
'passport': BeanPassport;
'roleInner': BeanRoleInner;
'userInner': BeanUserInner;
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.createUserAnonymous.ts';
export * from '../bean/event.signin.ts';
export * from '../bean/event.signout.ts';

import 'vona';
declare module 'vona' {
  
  
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
import type { EventCreateUserAnonymous } from '../bean/event.createUserAnonymous.ts';
import type { EventSignin } from '../bean/event.signin.ts';
import type { EventSignout } from '../bean/event.signout.ts';
export interface IModuleEvent {
  'createUserAnonymous': EventCreateUserAnonymous;
'signin': EventSignin;
'signout': EventSignout;
}
/** event: end */
/** event: begin */
import type { TypeEventCreateUserAnonymousData, TypeEventCreateUserAnonymousResult } from '../bean/event.createUserAnonymous.ts';
import type { TypeEventSigninData, TypeEventSigninResult } from '../bean/event.signin.ts';
import type { TypeEventSignoutData, TypeEventSignoutResult } from '../bean/event.signout.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-user:createUserAnonymous': EventOn<TypeEventCreateUserAnonymousData, TypeEventCreateUserAnonymousResult>;
'a-user:signin': EventOn<TypeEventSigninData, TypeEventSigninResult>;
'a-user:signout': EventOn<TypeEventSignoutData, TypeEventSignoutResult>;
  }
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.printTip.ts';

import 'vona';
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
/** meta: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAUser extends BeanScopeBase {}

export interface ScopeModuleAUser {
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
