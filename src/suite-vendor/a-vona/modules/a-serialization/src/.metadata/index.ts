/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.serializer.ts';
import type { IInterceptorOptionsSerializer } from '../bean/interceptor.serializer.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
  
export interface IInterceptorRecordLocal {
  'a-serialization:serializer': IInterceptorOptionsSerializer;
}

}
declare module 'vona-module-a-serialization' {
  
        export interface InterceptorSerializer {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface InterceptorSerializer {
            get $beanFullName(): 'a-serialization.interceptor.serializer';
            get $onionName(): 'a-serialization:serializer';
          } 
}
/** interceptor: end */
/** bean: begin */
export * from '../bean/bean.serializer.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-serialization' {
  
        export interface BeanSerializer {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanSerializer } from '../bean/bean.serializer.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'serializer': BeanSerializer;
  }
}
/** bean: end */
/** serializerTransform: begin */
export * from '../bean/serializerTransform.getter.ts';
export * from '../bean/serializerTransform.sensitive.ts';
import type { ISerializerTransformOptionsGetter } from '../bean/serializerTransform.getter.ts';
import type { ISerializerTransformOptionsSensitive } from '../bean/serializerTransform.sensitive.ts';
import 'vona';
declare module 'vona-module-a-serialization' {
  
    export interface ISerializerTransformRecord {
      'a-serialization:getter': ISerializerTransformOptionsGetter;
'a-serialization:sensitive': ISerializerTransformOptionsSensitive;
    }

  
}
declare module 'vona-module-a-serialization' {
  
        export interface SerializerTransformGetter {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface SerializerTransformGetter {
            get $beanFullName(): 'a-serialization.serializerTransform.getter';
            get $onionName(): 'a-serialization:getter';
          }

        export interface SerializerTransformSensitive {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface SerializerTransformSensitive {
            get $beanFullName(): 'a-serialization.serializerTransform.sensitive';
            get $onionName(): 'a-serialization:sensitive';
          } 
}
/** serializerTransform: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASerialization extends BeanScopeBase {}

export interface ScopeModuleASerialization {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-serialization': ScopeModuleASerialization;
  }

  export interface IBeanScopeContainer {
    serialization: ScopeModuleASerialization;
  }
  
  

  
}

/** scope: end */
