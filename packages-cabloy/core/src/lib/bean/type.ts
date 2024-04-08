/** bean merge: bean.instance */
export interface IBeanRecord {}

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecord = { [property in keyof IBeanScopeRecord]: IBeanScopeRecord[property] };
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfig = { [property in keyof IBeanScopeConfig]: IBeanScopeConfig[property] };
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;
