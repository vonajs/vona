import { IBeanRecord } from '../type.js';
import { BeanModuleScopeBase } from '../beanModuleScopeBase.js';

export type TypeModuleBean = {
  [property in keyof IBeanRecord as IBeanRecord[property] extends BeanModuleScopeBase
    ? property
    : never]: IBeanRecord[property];
};

// export type TypeModuleResource<
//   CONFIG extends (app: VonaApplication) => object,
//   ERRORS,
//   LOCALES,
//   CONSTANTS = object,
//   STATUS = unknown,
//   SERVICE = unknown,
//   MODEL = unknown,
//   ENTITY = unknown,
//   SUMMERCACHE = unknown,
// > = {
//   _bean: TypeModuleBean;
//   config: TypeModuleConfig<CONFIG>;
//   error: TypeModuleErrors<ERRORS>;
//   locale: TypeModuleLocales<LOCALES>;
//   constant: TypeModuleConstants<CONSTANTS>;
//   status: STATUS;
//   service: SERVICE;
//   model: MODEL;
//   entity: ENTITY;
//   summerCache: SUMMERCACHE;
//   util: BeanScopeUtil;
// };
