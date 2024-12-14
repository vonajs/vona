// todo: remove
export type TypeModuleMiddlewareRight =
  | { type: 'atom'; atomClass?: string; action: string; stage?: string; checkFlow?: boolean }
  | { type: 'atomClass' }
  | { type: 'resource'; module?: string; name?: string; useKey?: boolean };

// todo: remove
export interface IModuleMiddlewareValidate {
  module?: string;
  validator?: string;
  schema?: string;
}

export interface IModuleMiddlewareAuth {
  user?: boolean;
  enable?: boolean;
}

export interface IModuleMiddlewareCaptchaVerifyScene {
  name: string;
  dataKey?: string;
  fieldKey?: string;
}
export interface IModuleMiddlewareCaptchaVerify {
  scene?: IModuleMiddlewareCaptchaVerifyScene;
  scenes?: IModuleMiddlewareCaptchaVerifyScene[];
}

export interface IModuleMiddlewareAuthOpen {
  enableAuthOpen?: boolean;
  onlyAuthOpen?: boolean;
}

export interface IModuleRouteMeta {
  right?: TypeModuleMiddlewareRight;
  validate?: IModuleMiddlewareValidate;
  auth?: IModuleMiddlewareAuth;
  captchaVerify?: IModuleMiddlewareCaptchaVerify;
  authOpen?: IModuleMiddlewareAuthOpen;
}
export interface IModuleRoute {
  name?: string;
  method: 'get' | 'post' | 'options';
  path: string | RegExp;
  controller?: string | { module: string; name: string };
  action?: string;
  middlewares?: string | string[];
  meta?: IModuleRouteMeta;
}
