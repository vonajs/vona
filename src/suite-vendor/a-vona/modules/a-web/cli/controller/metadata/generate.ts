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
      const apiPath = __combineApiPath(moduleName, controllerPath, actionPath);
      if (!apiPath.includes(':')) {
        contentPaths[method].push(`'${apiPath}': '${apiPath}'`);
      } else {
        const apiPath1 = apiPath.replace(/(:[^\/]+)/g, (_, _part) => {
          return ':_string_';
        });
        const apiPath2 = apiPath.replace(/(:[^\/]+)/g, (_, part) => {
          return `:_${part.substring(1)}_`;
        });
        const apiPath3 = apiPath.replace(/(:[^\/]+)/g, (_, _part) => {
          return '${string}';
        });
        contentPaths[method].push(`'${apiPath1}': '${apiPath2}'`);
        contentPaths[method].push(`'${apiPath}': \`${apiPath3}\``);
      }
    }
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

function __combineApiPath(
  moduleName: string,
  controllerPath: string | undefined,
  actionPath: RegExp | string | undefined,
) {
  let apiPath = combineApiPathControllerAndAction(
    moduleName,
    controllerPath,
    actionPath,
    '/_api_',
    true,
  ) as unknown as string;
  if (apiPath.startsWith('/_api_')) {
    apiPath = apiPath.substring('/_api_'.length);
  } else {
    apiPath = '/' + apiPath;
  }
  return apiPath;
}

function combineApiPathControllerAndAction(
  moduleName: string,
  controllerPath: string | undefined,
  actionPath: RegExp | string | undefined,
  prefix?: string | boolean,
  simplify?: boolean,
): RegExp | string {
  if (actionPath === undefined) actionPath = '';
  // routePath
  let routePath: RegExp | string;
  if (typeof actionPath !== 'string') {
    // regexp
    routePath = actionPath;
  } else if (actionPath.startsWith('/')) {
    // absolute
    routePath = combineApiPath(moduleName, actionPath, prefix, simplify);
  } else {
    // relative
    if (!controllerPath) {
      routePath = combineApiPath(moduleName, actionPath, prefix, simplify);
    } else {
      routePath = combineApiPath(moduleName, controllerPath, prefix, simplify);
      if (actionPath) {
        routePath = `${routePath}/${actionPath}`;
      }
    }
  }
  return routePath;
}

function combineApiPath(moduleName: string, path: string | undefined, prefix?: string | boolean, simplify?: boolean) {
  const globalPrefix = typeof prefix === 'string' ? prefix : prefix === false ? '' : this.app.config.globalPrefix;
  simplify = simplify ?? true;
  if (!path) path = '';
  // ignore globalPrefix
  if (path.startsWith('//')) return path.substring(1);
  // ignore module path
  if (path.startsWith('/')) return `${globalPrefix}${path}`;
  // globalPrefix + module path + arg
  const parts = moduleName.split('-');
  // path
  let res = globalPrefix;
  if (!simplify || parts[0] !== 'a') res = `${res}/${parts[0]}`;
  if (!simplify || !path.startsWith(parts[1])) res = `${res}/${parts[1]}`;
  if (path) res = `${res}/${path}`;
  return res;
}
