export interface IModuleConfigStartup {
  bean: string | { module: string; name: string };
  instance?: boolean;
  debounce?: boolean;
}
