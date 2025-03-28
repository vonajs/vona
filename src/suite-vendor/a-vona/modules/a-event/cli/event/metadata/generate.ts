import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, globFiles } = options;
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    const { beanName, beanNameFull, fileNameJSRelative } = globFile;
    const beanNameCapitalize = toUpperCaseFirstChar(beanName);
    const typeData = `TypeEvent${beanNameCapitalize}Data`;
    const typeResult = `TypeEvent${beanNameCapitalize}Result`;
    contentImports.push(`import type { ${typeData}, ${typeResult} } from '${fileNameJSRelative}';`);
    contentRecords.push(`'${beanNameFull}': (data: ${typeData}) => Promise<${typeResult}> | ${typeResult};`);
  }
  if (contentImports.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
${contentImports.join('\n')}
import 'vona-module-a-event';  
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    ${contentRecords.join('\n')}
  }
}
/** ${sceneName}: end */
`;
  return content;
}
