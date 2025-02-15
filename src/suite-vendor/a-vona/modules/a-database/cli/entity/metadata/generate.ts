import { IMetadataCustomGenerateOptions } from '@cabloy/cli';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { sceneName, moduleName, globFiles } = options;
  const contentColumns: string[] = [];
  for (const globFile of globFiles) {
    const { className } = globFile;
    contentColumns.push(`
    export interface ${className} {
      column: <K extends keyof Omit<${className}, 'column' | 'columns' | 'table'>>(column: K) => K;
      columns: <K extends keyof Omit<${className}, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
    }`);
  }
  if (contentColumns.length === 0) return '';
  // combine
  const content = `/** ${sceneName}: begin */
declare module 'vona-module-${moduleName}' {
  ${contentColumns.join('\n')} 
}
/** ${sceneName}: end */
`;
  return content;
}
