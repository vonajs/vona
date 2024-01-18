/** bean merge: bean.instance */
export interface IBeanRecord {}
export type TypeBeanRecord = { [property in keyof IBeanRecord]: IBeanRecord[property] };
