import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  return '';
  const { sceneName, moduleName, globFiles } = options;
  const contentPaths: Record<string, string[]> = {};
  for (const globFile of globFiles) {
    const { fileContent } = globFile;
  }
  if (Object.keys(contentPaths).length === 0) return '';
  let contentRecord = '';
  for (const method in contentPaths) {
    contentRecord += `export interface IApiPath${method}Record{
        ${contentPaths[method].join('\n')}
    }\n`;
  }
  // combine
  const content = `/** ${sceneName}: begin */
declare module 'vona-module-a-web' {
  ${contentRecord}
}
/** ${sceneName}: end */
`;
  return content;
}
