/** bean merge: bean.instance */

import type { IBeanSceneRecord } from '../decorator/interface/beanOptions.ts';
import type { errorsInternal } from './resource/error/errorInternal.ts';

export interface IBeanRecordGlobal {}
export interface IBeanRecordGeneral {}
export type TypeBeanRecordGeneralSelector<SCENE extends keyof IBeanSceneRecord> = {
  [K in keyof IBeanRecordGeneral as K extends `${string}.${SCENE}.${string}` ? K : never]: IBeanRecordGeneral[K];
};
export type TypeBeanRecordGeneralSelectorKeys<SCENE extends keyof IBeanSceneRecord> =
  keyof TypeBeanRecordGeneralSelector<SCENE>;

export type IBeanRecord = IBeanRecordGlobal & IBeanRecordGeneral;
export type TypeBeanRecordKeys = keyof IBeanRecord;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IBeanScopeLocale {}
export type TypeBeanScopeLocaleKeys = keyof IBeanScopeLocale;

export interface IBeanScopeErrors {}
export type TypeBeanScopeErrorsKeys = keyof IBeanScopeErrors;

export type TypeScopesErrorsHelper<ModuleName extends keyof IBeanScopeErrors> = {
  [K in keyof IBeanScopeErrors[ModuleName] as `${ModuleName}:${IBeanScopeErrors[ModuleName][K]}` ]: K
};
export type TypeScopesErrors = TypeScopesErrorsHelper<keyof IBeanScopeErrors>;
export type TypeAllErrors = TypeScopesErrors & typeof errorsInternal;
