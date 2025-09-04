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

          export interface GuardPassport {
            get $beanFullName(): 'a-user.guard.passport';
            get $onionName(): 'a-user:passport';
          }

        export interface GuardRoleName {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface GuardRoleName {
            get $beanFullName(): 'a-user.guard.roleName';
            get $onionName(): 'a-user:roleName';
          }

        export interface GuardUserName {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface GuardUserName {
            get $beanFullName(): 'a-user.guard.userName';
            get $onionName(): 'a-user:userName';
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
/** service: begin */
export * from '../service/authTokenAdapter.ts';
export * from '../service/redisToken.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-user:authTokenAdapter': never;
'a-user:redisToken': never;
    }

  
}
declare module 'vona-module-a-user' {
  
        export interface ServiceAuthTokenAdapter {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface ServiceAuthTokenAdapter {
            get $beanFullName(): 'a-user.service.authTokenAdapter';
            get $onionName(): 'a-user:authTokenAdapter';
          }

        export interface ServiceRedisToken {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface ServiceRedisToken {
            get $beanFullName(): 'a-user.service.redisToken';
            get $onionName(): 'a-user:redisToken';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceAuthTokenAdapter } from '../service/authTokenAdapter.ts';
import type { ServiceRedisToken } from '../service/redisToken.ts';
export interface IModuleService {
  'authTokenAdapter': ServiceAuthTokenAdapter;
'redisToken': ServiceRedisToken;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-user.service.authTokenAdapter': ServiceAuthTokenAdapter;
'a-user.service.redisToken': ServiceRedisToken;
  }
}
/** service: end */
/** event: begin */
export * from '../bean/event.activate.ts';
export * from '../bean/event.createUserAnonymous.ts';
export * from '../bean/event.signin.ts';
export * from '../bean/event.signout.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-user' {
  
        export interface EventActivate {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface EventActivate {
            get $beanFullName(): 'a-user.event.activate';
            get $onionName(): 'a-user:activate';
          }

        export interface EventCreateUserAnonymous {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface EventCreateUserAnonymous {
            get $beanFullName(): 'a-user.event.createUserAnonymous';
            get $onionName(): 'a-user:createUserAnonymous';
          }

        export interface EventSignin {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface EventSignin {
            get $beanFullName(): 'a-user.event.signin';
            get $onionName(): 'a-user:signin';
          }

        export interface EventSignout {
          /** @internal */
          get scope(): ScopeModuleAUser;
        }

          export interface EventSignout {
            get $beanFullName(): 'a-user.event.signout';
            get $onionName(): 'a-user:signout';
          } 
}
/** event: end */
/** event: begin */
import type { EventActivate } from '../bean/event.activate.ts';
import type { EventCreateUserAnonymous } from '../bean/event.createUserAnonymous.ts';
import type { EventSignin } from '../bean/event.signin.ts';
import type { EventSignout } from '../bean/event.signout.ts';
export interface IModuleEvent {
  'activate': EventActivate;
'createUserAnonymous': EventCreateUserAnonymous;
'signin': EventSignin;
'signout': EventSignout;
}
/** event: end */
/** event: begin */
import type { TypeEventActivateData, TypeEventActivateResult } from '../bean/event.activate.ts';
import type { TypeEventCreateUserAnonymousData, TypeEventCreateUserAnonymousResult } from '../bean/event.createUserAnonymous.ts';
import type { TypeEventSigninData, TypeEventSigninResult } from '../bean/event.signin.ts';
import type { TypeEventSignoutData, TypeEventSignoutResult } from '../bean/event.signout.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-user:activate': EventOn<TypeEventActivateData, TypeEventActivateResult>;
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

          export interface MetaPrintTip {
            get $beanFullName(): 'a-user.meta.printTip';
            get $onionName(): 'a-user:printTip';
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
service: IModuleService;
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
