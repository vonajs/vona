export interface IModuleRouteMeta {
  right?:
    | { type: 'atom'; atomClass?: string; action: string; stage?: string; checkFlow?: boolean }
    | { type: 'atomClass' }
    | { type: 'resource'; module?: string; name?: string };
  validate?: { validator?: string; schema?: string };
  auth?: { user?: boolean; enable?: boolean };
  captchaVerify?: { scene: { name: string } };
  authOpen?: { enableAuthOpen?: boolean; onlyAuthOpen?: boolean };
}
export interface IModuleRoute {
  method: 'get' | 'post';
  path: string;
  controller: string;
  action?: string;
  middlewares?: string | string[];
  meta?: IModuleRouteMeta;
}
