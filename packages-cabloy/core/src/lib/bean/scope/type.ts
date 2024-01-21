import { CabloyApplication } from '../../../types/application/app.js';
import { TypeModuleConfig } from '../resource/config/type.js';
import { TypeModuleErrors } from '../resource/error/type.js';
import { TypeModuleLocales } from '../resource/locale/type.js';

export type TypeModuleResource<
  LOCAL,
  CONFIG extends (app: CabloyApplication) => object,
  ERRORS,
  LOCALES extends { 'zh-cn': object },
> = {
  local: LOCAL;
  config: TypeModuleConfig<CONFIG>;
  error: TypeModuleErrors<ERRORS>;
  locale: TypeModuleLocales<LOCALES>;
};
