export type TypeModuleMiddlewareRight =
  | { type: 'atom'; atomClass?: string; action: string; stage?: string; checkFlow?: boolean }
  | { type: 'atomClass' }
  | { type: 'resource'; module?: string; name?: string };

export interface IModuleMiddlewareValidate {
  module?: string;
  validator?: string;
  schema?: string;
}

export interface IModuleMiddlewareAuth {
  user?: boolean;
  enable?: boolean;
}

export interface IModuleMiddlewareCaptchaVerify {
  scene: { name: string };
}

export interface IModuleMiddlewareAuthOpen {
  enableAuthOpen?: boolean;
  onlyAuthOpen?: boolean;
}

export interface IModuleMiddlewareGate {
  env?: string | string[];
}

export interface IModuleRouteMeta {
  right?: TypeModuleMiddlewareRight;
  validate?: IModuleMiddlewareValidate;
  auth?: IModuleMiddlewareAuth;
  captchaVerify?: IModuleMiddlewareCaptchaVerify;
  authOpen?: IModuleMiddlewareAuthOpen;
  gate?: IModuleMiddlewareGate;
}
export interface IModuleRoute {
  method: 'get' | 'post' | 'options';
  path: string | RegExp;
  controller?: string;
  action?: string;
  middlewares?: string | string[];
  meta?: IModuleRouteMeta;
}
