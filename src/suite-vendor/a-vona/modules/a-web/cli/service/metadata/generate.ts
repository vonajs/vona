import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { beanName, className, isIgnore } = globFile;
    const beanFullName = `${moduleName}.service.${beanName}`;
    if (isIgnore) continue;
    contentRecords.push(`'${beanFullName}': ${className};`);
  }
  if (contentRecords.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
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
