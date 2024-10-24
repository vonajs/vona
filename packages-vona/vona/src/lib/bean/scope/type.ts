import { VonaApplication } from '../../../types/application/app.js';
import { TypeModuleConfig } from '../resource/config/type.js';
import { TypeModuleErrors } from '../resource/error/type.js';
import { TypeModuleLocales } from '../resource/locale/type.js';
import { TypeModuleConstants } from '../resource/constant/type.js';
import { IBeanRecord } from '../type.js';
import { BeanModuleScopeBase } from '../beanModuleScopeBase.js';

type TypeModuleBean = {
  [property in keyof IBeanRecord as IBeanRecord[property] extends BeanModuleScopeBase
    ? property
    : never]: IBeanRecord[property];
};

export type TypeModuleResource<
  SERVICE,
  MODEL,
  CONFIG extends (app: VonaApplication) => object,
  ERRORS,
  LOCALES,
  CONSTANTS = object,
> = {
  _bean: TypeModuleBean;
  service: SERVICE;
  model: MODEL;
  config: TypeModuleConfig<CONFIG>;
  error: TypeModuleErrors<ERRORS>;
  locale: TypeModuleLocales<LOCALES>;
  constant: TypeModuleConstants<CONSTANTS>;
};
