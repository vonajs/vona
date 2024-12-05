import { VonaApplication } from '../../../types/application/app.js';
import { TypeModuleConfig } from '../resource/config/type.js';
import { TypeModuleErrors } from '../resource/error/type.js';
import { TypeModuleLocales } from '../resource/locale/type.js';
import { TypeModuleConstants } from '../resource/constant/type.js';
import { IBeanRecord } from '../type.js';
import { BeanModuleScopeBase } from '../beanModuleScopeBase.js';
import { BeanScopeUtil } from './beanScopeUtil.js';

type TypeModuleBean = {
  [property in keyof IBeanRecord as IBeanRecord[property] extends BeanModuleScopeBase
    ? property
    : never]: IBeanRecord[property];
};

export type TypeModuleResource<
  CONFIG extends (app: VonaApplication) => object,
  ERRORS,
  LOCALES,
  CONSTANTS = object,
  SERVICE = unknown,
  MODEL = unknown,
  ENTITY = unknown,
  SUMMERCACHE = unknown,
> = {
  _bean: TypeModuleBean;
  config: TypeModuleConfig<CONFIG>;
  error: TypeModuleErrors<ERRORS>;
  locale: TypeModuleLocales<LOCALES>;
  constant: TypeModuleConstants<CONSTANTS>;
  service: SERVICE;
  model: MODEL;
  entity: ENTITY;
  summerCache: SUMMERCACHE;
  util: BeanScopeUtil;
};
