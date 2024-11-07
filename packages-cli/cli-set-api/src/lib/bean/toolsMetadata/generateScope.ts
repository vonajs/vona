import { relativeNameToCapitalize } from 'vona';

export interface GenerateScopeOptions {
  config: string;
  errors: string;
  locales: string;
  constants: string;
  services: string;
  models: string;
}
export async function generateScope(moduleName: string, relativeNameCapitalize: string, options: GenerateScopeOptions) {
  // scopeVariable
  const parts = moduleName.split('-');
  const scopeVariable = parts[0] === 'a' ? parts[1] : relativeNameToCapitalize(moduleName, false);
  // combine
  const content = `/** scope: begin */
import { BeanScopeBase, Scope, ${options.locales ? 'TypeLocaleBase,' : ''} TypeModuleResource } from 'vona';

@Scope()
export class ScopeModule${relativeNameCapitalize} extends BeanScopeBase {}

export interface ScopeModule${relativeNameCapitalize}
  extends TypeModuleResource<
    ${options.config ? 'typeof config' : 'any'},
    ${options.errors ? 'typeof Errors' : 'any'},
    ${options.locales ? '(typeof locales)[TypeLocaleBase]' : 'any'},
    ${options.constants ? 'typeof constants' : 'any'},
    ${options.services ? 'IModuleService' : 'any'},
    ${options.models ? 'IModuleModel' : 'any'},
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    '${moduleName}': ScopeModule${relativeNameCapitalize};
  }

  export interface BeanScopeContainer {
    ${scopeVariable}: ScopeModule${relativeNameCapitalize};
  }
  
  ${
    options.config
      ? `export interface IBeanScopeConfig {
    '${moduleName}': ReturnType<typeof config>;
  }`
      : ''
  }

  ${
    options.locales
      ? `export interface IBeanScopeLocale {
    '${moduleName}': (typeof locales)[TypeLocaleBase];
  }`
      : ''
  }
}
/** scope: end */
`;
  return content;
}
