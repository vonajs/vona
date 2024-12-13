import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { beanName, className, fileNameJSRelative, isIgnore } = globFile;
    const beanFullName = `${moduleName}.service.${beanName}`;
    if (isIgnore) continue;
    contentImports.push(`import { ${className} } from '${fileNameJSRelative}';`);
    contentRecords.push(`'${beanFullName}': ${className};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
${contentImports.join('\n')}  
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    ${contentRecords.join('\n')}
  }
}
/** ${sceneName}: end */
`;
  return content;
}
