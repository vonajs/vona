export interface IModuleConfigMiddleware {
  bean: string | { module: string; name: string };
  global?: boolean;
  dependencies?: string | string[];
}
