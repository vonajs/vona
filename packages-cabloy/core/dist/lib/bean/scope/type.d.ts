import { CabloyApplication } from '../../../types/application/app.js';
import { TypeModuleConfig } from '../resource/config/type.js';
import { TypeModuleErrors } from '../resource/error/type.js';
import { TypeModuleLocales } from '../resource/locale/type.js';
import { TypeModuleConstants } from '../resource/constant/type.js';
import { IBeanRecord } from '../type.js';
import { BeanModuleScopeBase } from '../beanModuleScopeBase.js';
type TypeModuleBean = {
    [property in keyof IBeanRecord as IBeanRecord[property] extends BeanModuleScopeBase ? property : never]: IBeanRecord[property];
};
export type TypeModuleResource<LOCAL, MODEL, CONFIG extends (app: CabloyApplication) => object, ERRORS, LOCALES extends {
    'zh-cn': object;
}, CONSTANTS = object> = {
    _bean: TypeModuleBean;
    local: LOCAL;
    model: MODEL;
    config: TypeModuleConfig<CONFIG>;
    error: TypeModuleErrors<ERRORS>;
    locale: TypeModuleLocales<LOCALES>;
    constant: TypeModuleConstants<CONSTANTS>;
};
export {};
//# sourceMappingURL=type.d.ts.map