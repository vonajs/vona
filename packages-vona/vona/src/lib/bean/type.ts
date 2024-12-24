/** bean merge: bean.instance */

export interface IBeanRecordGlobal {}
export interface IBeanRecordGeneral {}
export type IBeanRecordGeneralSelector<SCENE extends string> = {
  [K in keyof IBeanRecordGeneral as K extends `${string}.${SCENE}.${string}` ? K : never]: IBeanRecordGeneral[K];
};
export type TypeBeanRecordGeneralSelectorKeys<SCENE extends string> = keyof IBeanRecordGeneralSelector<SCENE>;

export type IBeanRecord = IBeanRecordGlobal & IBeanRecordGeneral;
export type TypeBeanRecordKeys = keyof IBeanRecord;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IBeanScopeLocale {}
export type TypeBeanScopeLocaleKeys = keyof IBeanScopeLocale;
