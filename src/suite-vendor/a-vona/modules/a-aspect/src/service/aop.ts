import type { Constructable, IBeanRecord } from 'vona';
import type { IDecoratorAopOptions } from '../types/aop.ts';
import type { IUseAopMethodPropMetadata } from '../types/aopMethod.ts';
import { appMetadata, appResource, BeanBase, beanFullNameFromOnionName, deepExtend, SymbolProxyDisable } from 'vona';
import { Service } from 'vona-module-a-web';
import { SymbolDecoratorUseAopMethod } from '../types/aopMethod.ts';

@Service()
export class ServiceAop extends BeanBase {
  protected [SymbolProxyDisable]: boolean = true;

  findAopsMatched<T>(A: Constructable<T>): string[] | undefined;
  findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): string[] | undefined;
  findAopsMatched(beanFullName: string): string[] | undefined;
  findAopsMatched<T>(beanFullName: Constructable<T> | string): string[] | undefined {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    // loop
    const aopsMatched: string[] = [];
    for (const aop of this.bean.onion.aop.onionsGlobal) {
      const aopOptions = aop.beanOptions.options as IDecoratorAopOptions;
      // not self
      if (aop.beanOptions.beanFullName === beanOptions.beanFullName) continue;
      // // check if match aop
      // if (beanOptions.scene === 'aop' && !aop.beanOptions.matchAop) continue;
      // check if enabled
      if (this.bean.onion.checkOnionOptionsEnabled(aopOptions, beanOptions.beanFullName)) {
        aopsMatched.push(aop.beanOptions.beanFullName);
      }
    }
    return aopsMatched;
  }

  hasAopMethods<T>(A: Constructable<T>): boolean;
  hasAopMethods<K extends keyof IBeanRecord>(beanFullName: K): boolean;
  hasAopMethods(beanFullName: string): boolean;
  hasAopMethods<T>(beanFullName: Constructable<T> | string): boolean {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return false;
    const uses = appMetadata.getMetadata(SymbolDecoratorUseAopMethod, beanOptions.beanClass.prototype);
    return !!uses;
  }

  findAopMethodsMatched<T>(A: Constructable<T>, prop: string): IUseAopMethodPropMetadata[] | undefined;
  findAopMethodsMatched<K extends keyof IBeanRecord>(beanFullName: K, prop: string): IUseAopMethodPropMetadata[] | undefined;
  findAopMethodsMatched(beanFullName: string, prop: string): IUseAopMethodPropMetadata[] | undefined;
  findAopMethodsMatched<T>(beanFullName: Constructable<T> | string, prop: string): IUseAopMethodPropMetadata[] | undefined {
    // beanOptions
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) return;
    const aopMethodsMatched: IUseAopMethodPropMetadata[] = [];
    const uses = appMetadata.getMetadata(SymbolDecoratorUseAopMethod, beanOptions.beanClass.prototype);
    const aopMethods: IUseAopMethodPropMetadata[] | undefined = uses?.[prop];
    if (aopMethods) {
      for (const aopMethod of aopMethods) {
        const onionSlice = this.bean.onion.aopMethod.getOnionSlice(aopMethod.onionName!);
        const options = deepExtend({}, onionSlice.beanOptions.options, aopMethod.options);
        if (this.bean.onion.checkOnionOptionsEnabled(options)) {
          const beanFullName = beanFullNameFromOnionName(aopMethod.onionName!, 'aopMethod');
          const beanInstance = this.app.bean._getBean(beanFullName as any);
          aopMethodsMatched.push({
            onionName: aopMethod.onionName,
            beanInstance,
            options,
          });
        }
      }
    }
    return aopMethodsMatched;
  }
}
