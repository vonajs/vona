import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentPaths: Record<string, string[]> = {};
  for (const globFile of globFiles) {
    const { fileContent } = globFile;
    // controllerPath
    const controllerPath = __parseControllerPath(fileContent);
    if (controllerPath === false) continue;
    // actionPath;
    const actionPaths = __parseActionPaths(fileContent);
    for (const [method, actionPath] of actionPaths) {
      if (!contentPaths[method]) contentPaths[method] = [];

      contentPaths[method].push(`${actionPath}: ${actionPath}`);
    }
  }
  if (Object.keys(contentPaths).length === 0) return '';
  console.log(JSON.stringify(contentPaths, null, 2));
  // combine
  const content = `/** ${sceneName}: begin */
declare module 'vona-module-${moduleName}' {
  ${contentPaths['Get'].join('\n')} 
}
/** ${sceneName}: end */
`;
  return content;
}

function __parseControllerPath(fileContent: string): string | false {
  let matched = fileContent.match(/@Controller\(\{[\s\S]*?path: ('[^']*')[\s\S]*?\}[\s\S]*?\)\s*?export class/);
  if (!matched) {
    matched = fileContent.match(/@Controller\(([^\)]*)\)/);
  }
  if (!matched) return false;
  const controllerPath = matched[1];
  if (controllerPath === '') return '';
  return controllerPath.replaceAll("'", '');
}

function __parseActionPaths(fileContent: string): [string, string][] {
  const actionPaths: [string, string][] = [];
  const matches = fileContent.match(/(@Get|@Post|@Delete|@Put|@Patch)\(.*\)/g);
  if (!matches) return [];
  for (const match of matches) {
    const matches2 = match.match(/@([^\(]*)\((.*)\)/);
    if (!matches2) throw new Error('parse action path error');
    let actionPath = matches2[2];
    if (actionPath !== '' && !actionPath.startsWith("'")) continue;
    if (actionPath.startsWith("'")) actionPath = actionPath.replaceAll("'", '');
    actionPaths.push([matches2[1], actionPath]);
  }
  return actionPaths;
}
