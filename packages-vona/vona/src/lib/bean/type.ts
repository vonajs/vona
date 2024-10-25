/** bean merge: bean.instance */

export interface IBeanRecordGlobal {}
export interface IBeanRecordGeneral {}

export type IBeanRecord = IBeanRecordGlobal & IBeanRecordGeneral;
export type TypeBeanRecordKeys = keyof IBeanRecord;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IBeanScopeLocale {}
export type TypeBeanScopeLocaleKeys = keyof IBeanScopeLocale;
