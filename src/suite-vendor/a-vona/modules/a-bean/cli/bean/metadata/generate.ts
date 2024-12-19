import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, globFiles } = options;
  const contentImports: string[] = [];
  const contentRecordsGlobal: string[] = [];
  for (const globFile of globFiles) {
    let { className, beanName, fileNameJSRelative, isIgnore } = globFile;
    if (isIgnore) continue;
    const beanFullName = beanName;
    if (className === 'BeanBase') className = 'BeanBase2';
    contentImports.push(`import { ${className} } from '${fileNameJSRelative}';`);
    contentRecordsGlobal.push(`'${beanFullName}': ${className};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
${contentImports.join('\n')}
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    ${contentRecordsGlobal.join('\n')}
  }
}
/** ${sceneName}: end */
`;
  return content;
}
