import type { Constructable, IBeanRecord } from 'vona';
import type { IDecoratorAopOptions } from '../types/aop.ts';
import { appResource, BeanBase, SymbolProxyDisable } from 'vona';
import { Service } from 'vona-module-a-web';

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
}
