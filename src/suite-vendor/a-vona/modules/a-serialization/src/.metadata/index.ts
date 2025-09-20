/* eslint-disable */
/** serializerTransform: begin */
export * from '../bean/serializerTransform.sensitive.ts';
import type { ISerializerTransformOptionsSensitive } from '../bean/serializerTransform.sensitive.ts';
import 'vona';
declare module 'vona-module-a-serialization' {
  
    export interface ISerializerTransformRecord {
      'a-serialization:sensitive': ISerializerTransformOptionsSensitive;
    }

  
}
declare module 'vona-module-a-serialization' {
  
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
