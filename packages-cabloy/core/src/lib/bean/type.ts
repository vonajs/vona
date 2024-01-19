/** bean merge: bean.instance */
export interface IBeanRecord {}
export type TypeBeanRecord = { [property in keyof IBeanRecord]: IBeanRecord[property] };

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecord = { [property in keyof IBeanScopeRecord]: IBeanScopeRecord[property] };
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;
