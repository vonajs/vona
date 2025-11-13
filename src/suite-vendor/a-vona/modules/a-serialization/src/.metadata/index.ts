/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.serializer.ts';
import type { IInterceptorOptionsSerializer } from '../bean/interceptor.serializer.ts';
import 'vona-module-a-aspect';
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
            get $onionOptions(): IInterceptorOptionsSerializer;
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
export * from '../bean/serializerTransform.exclude.ts';
export * from '../bean/serializerTransform.getter.ts';
export * from '../bean/serializerTransform.sensitive.ts';
import type { ISerializerTransformOptionsExclude } from '../bean/serializerTransform.exclude.ts';
import type { ISerializerTransformOptionsGetter } from '../bean/serializerTransform.getter.ts';
import type { ISerializerTransformOptionsSensitive } from '../bean/serializerTransform.sensitive.ts';
import 'vona-module-a-serialization';
declare module 'vona-module-a-serialization' {
  
    export interface ISerializerTransformRecord {
      'a-serialization:exclude': ISerializerTransformOptionsExclude;
'a-serialization:getter': ISerializerTransformOptionsGetter;
'a-serialization:sensitive': ISerializerTransformOptionsSensitive;
    }

  
}
declare module 'vona-module-a-serialization' {
  
        export interface SerializerTransformExclude {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface SerializerTransformExclude {
            get $beanFullName(): 'a-serialization.serializerTransform.exclude';
            get $onionName(): 'a-serialization:exclude';
            get $onionOptions(): ISerializerTransformOptionsExclude;
          }

        export interface SerializerTransformGetter {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface SerializerTransformGetter {
            get $beanFullName(): 'a-serialization.serializerTransform.getter';
            get $onionName(): 'a-serialization:getter';
            get $onionOptions(): ISerializerTransformOptionsGetter;
          }

        export interface SerializerTransformSensitive {
          /** @internal */
          get scope(): ScopeModuleASerialization;
        }

          export interface SerializerTransformSensitive {
            get $beanFullName(): 'a-serialization.serializerTransform.sensitive';
            get $onionName(): 'a-serialization:sensitive';
            get $onionOptions(): ISerializerTransformOptionsSensitive;
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
