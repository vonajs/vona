import { relativeNameToCapitalize } from 'vona';

export interface GenerateScopeOptions {
  config: string;
  errors: string;
  locales: string;
  constants: string;
}
export async function generateScope(
  moduleName: string,
  relativeNameCapitalize: string,
  scopeResources: Record<string, boolean>,
  options: GenerateScopeOptions,
) {
  // scopeVariable
  const parts = moduleName.split('-');
  const scopeVariable = parts[0] === 'a' ? parts[1] : relativeNameToCapitalize(moduleName, false);
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  // basic
  contentImports.push('BeanScopeBase');
  // _bean
  contentImports.push('TypeModuleBean');
  contentRecords.push('_bean: TypeModuleBean;');
  // util
  contentImports.push('BeanScopeUtil');
  contentRecords.push('util: BeanScopeUtil;');
  //
  if (options.config) {
    contentImports.push('TypeModuleConfig');
    contentRecords.push('config: TypeModuleConfig<typeof config>;');
  }
  if (options.errors) {
    contentImports.push('TypeModuleErrors');
    contentRecords.push('error: TypeModuleErrors<typeof Errors>;');
  }
  if (options.locales) {
    contentImports.push('TypeModuleLocales');
    contentImports.push('TypeLocaleBase');
    contentRecords.push('locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;');
  }
  if (options.constants) {
    contentImports.push('TypeModuleConstants');
    contentRecords.push('constant: TypeModuleConstants<typeof constants>;');
  }
  // loop
  for (const sceneName in scopeResources) {
    contentRecords.push(`${sceneName}: ${scopeResources[sceneName]};`);
  }
  // combine
  const content = `/** scope: begin */
import { ${contentImports.join(', ')} } from 'vona';
import { Scope } from '${moduleName === 'a-bean' ? '../lib/scope.js' : 'vona-module-a-bean'}';

@Scope()
export class ScopeModule${relativeNameCapitalize} extends BeanScopeBase {}

export interface ScopeModule${relativeNameCapitalize} {
  ${contentRecords.join('\n')}
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    '${moduleName}': ScopeModule${relativeNameCapitalize};
  }

  export interface IBeanScopeContainer {
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
${
  options.locales
    ? `\nexport function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): \`${moduleName}::\${K}\` {
  return \`${moduleName}::\${key}\`;
}`
    : ''
}
/** scope: end */
`;
  return content;
}
