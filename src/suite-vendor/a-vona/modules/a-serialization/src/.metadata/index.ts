/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.serializerTransform.ts';
import type { IInterceptorOptionsSerializerTransform } from '../bean/interceptor.serializerTransform.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IInterceptorRecordGlobal {
      'a-serialization:serializerTransform': IInterceptorOptionsSerializerTransform;
    }

  
}
declare module 'vona-module-a-serialization' {
  
        export interface InterceptorSerializerTransform {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface InterceptorSerializerTransform {
            get $beanFullName(): 'a-serialization.interceptor.serializerTransform';
            get $onionName(): 'a-serialization:serializerTransform';
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
