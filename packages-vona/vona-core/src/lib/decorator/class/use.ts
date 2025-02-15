import type { VonaApplication } from 'vona';
import type { IBeanRecord } from '../../bean/type.js';
import type { MetadataKey } from '../../core/metadata.js';
import type {
  Constructable,
  IDecoratorUseOptions,
  IDecoratorUseOptionsBase,
  IInjectSelectorInfo,
  IUsePrepareArgResult,
  TypeDecoratorUseOptionsInitArg,
} from '../index.js';
import { isNil } from '@cabloy/utils';
import { appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator & MethodDecorator;
export function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator & MethodDecorator;
export function Use(options?: IDecoratorUseOptions | string): PropertyDecorator & MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor?: PropertyDescriptor) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { beanFullName: options } as unknown as IDecoratorUseOptions;
    }
    // beanClass maybe has no specific class type
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    // beanFullName
    let beanFullName: string | undefined = options.beanFullName;
    if (!beanFullName) {
      beanFullName = appResource.getBeanFullName(beanClass);
      if (!beanFullName) throw new Error(`beanFullName not found for: ${beanClass.name}`);
    }
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanFullName,
      descriptor,
    });
  };
}

export function usePrepareArg(fn: () => any, withSelector?: boolean): any {
  return {
    withSelector,
    fns: [fn],
  };
}

export function usePrepareArgs(fns: Array<() => any>, withSelector?: boolean): any {
  return {
    withSelector,
    fns,
  };
}

export function __prepareInjectSelectorInfo(beanInstance, useOptions: IDecoratorUseOptionsBase): IInjectSelectorInfo {
  let withSelector = true;
  let args: any[] = [];
  let selectorInfo = __prepareInjectSelectorInfo_descriptor(beanInstance, useOptions);
  if (!selectorInfo) {
    selectorInfo = __prepareInjectSelectorInfo_init(beanInstance, useOptions);
  }
  if (selectorInfo) {
    withSelector = selectorInfo.withSelector;
    args = selectorInfo.args;
  }
  return { withSelector, args: withSelector ? [useOptions.selector, ...args] : args };
}

function __prepareInjectSelectorInfo_descriptor(
  beanInstance,
  useOptions: IDecoratorUseOptionsBase,
): IInjectSelectorInfo | undefined {
  const fnGet = useOptions.descriptor?.get;
  if (!fnGet) return;
  const res: IUsePrepareArgResult = fnGet.call(beanInstance);
  if (!res) return;
  const withSelector = res.withSelector ?? useOptions.selector !== undefined;
  const args = res.fns.map(fn => fn());
  return { withSelector, args };
}

function __prepareInjectSelectorInfo_init(
  beanInstance,
  useOptions: IDecoratorUseOptionsBase,
): IInjectSelectorInfo | undefined {
  const init = useOptions.init;
  if (!init) return;
  const withSelector = init.withSelector ?? useOptions.selector !== undefined;
  const _args = init.args ?? [init.arg];
  if (!_args) return;
  const args = _args.map(arg => __prepareInjectSelectorInfo_init_arg(beanInstance, arg));
  return { withSelector, args };
}

function __prepareInjectSelectorInfo_init_arg(beanInstance, arg: TypeDecoratorUseOptionsInitArg): any {
  if (isNil(arg)) return arg;
  if (Array.isArray(arg)) {
    return arg.map(item => __prepareInjectSelectorInfo_init_argInner(beanInstance, item));
  } else if (typeof arg === 'object') {
    const res = {};
    for (const key in arg) {
      res[key] = __prepareInjectSelectorInfo_init_argInner(beanInstance, arg[key]);
    }
    return res;
  }
  // others
  return __prepareInjectSelectorInfo_init_argInner(beanInstance, arg);
}

function __prepareInjectSelectorInfo_init_argInner(beanInstance, arg: TypeDecoratorUseOptionsInitArg): any {
  if (typeof arg !== 'string') return arg;
  if (arg.startsWith('##')) {
    return arg.substring('##'.length);
  }
  const app: VonaApplication = beanInstance.app;
  return app.meta.celjs.evaluate(arg, beanInstance);
}
