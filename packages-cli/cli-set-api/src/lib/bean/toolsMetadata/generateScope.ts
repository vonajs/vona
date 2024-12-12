import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { relativeNameToCapitalize } from 'vona';

export interface GenerateScopeOptions {
  config: string;
  errors: string;
  locales: string;
  constants: string;
  status: string;
  redlock: string;
  services: string;
  models: string;
  entities: string;
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
  contentImports.push('Scope');
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
  if (options.status) {
    contentRecords.push('status: MetaStatus;');
  }
  if (options.redlock) {
    contentRecords.push('redlock: MetaRedlock;');
  }
  if (options.services) {
    contentRecords.push('service: IModuleService;');
  }
  if (options.models) {
    contentRecords.push('model: IModuleModel;');
  }
  if (options.entities) {
    contentRecords.push('entity: IModuleEntity;');
  }
  // loop
  for (const sceneName in scopeResources) {
    const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
    contentRecords.push(`${sceneName}: IModule${sceneNameCapitalize};`);
  }
  // combine
  const content = `/** scope: begin */
import { ${contentImports.join(', ')} } from 'vona';

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
    ? `\nexport function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): \`${moduleName}:\${K}\` {
  return \`${moduleName}:\${key}\`;
}`
    : ''
}
/** scope: end */
`;
  return content;
}
