import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentColumns: string[] = [];
  for (const globFile of globFiles) {
    const { fileContent } = globFile;
    // controllerPath
    const controllerPath = __parseControllerPath(fileContent);
    console.log(controllerPath);
    // actionPath;
  }
  if (contentColumns.length === 0) return '';
  // combine
  const _content = `/** ${sceneName}: begin */
declare module 'vona-module-${moduleName}' {
  ${contentColumns.join('\n')} 
}
/** ${sceneName}: end */
`;
  return ''; //content;
}

function __parseControllerPath(fileContent: string): string | undefined {
  let matched = fileContent.match(/@Controller\('([^']*)'\)/);
  if (matched) return matched[1];
  matched = fileContent.match(/@Controller\(\{[\s\S]*?path: '([^']*)'[\s\S]*?\}[\s\S]*?\)\s*?export class/);
  if (matched) return matched[1];
}
