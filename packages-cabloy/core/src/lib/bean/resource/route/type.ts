export interface IModuleRoute {
  method: 'get' | 'post';
  path: string;
  controller: string;
  action?: string;
  middlewares?: string | string[];
  meta: {
    right?:
      | { type: 'atom'; atomClass?: string; action: string; stage?: string; checkFlow?: boolean }
      | { type: 'atomClass' }
      | { type: 'resource'; module?: string; name?: string };
    validate?: { validator?: string };
  };
}
