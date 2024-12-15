import { appResource, BeanBase, cast, Constructable, IBeanRecord, SymbolProxyDisable } from 'vona';
import { Service } from 'vona-module-a-web';
import { IDecoratorAopOptions, TypeDecoratorAopOptionsMatch } from '../types/aop.js';

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
      if (aopOptions.enable === false) continue;
      if (!this.bean.onion.checkOnionOptionsMeta(aopOptions.meta)) continue;
      if (
        (aopOptions.match && __aopMatch(aopOptions.match, beanOptions.beanFullName)) ||
        (aopOptions.ignore && !__aopMatch(aopOptions.ignore, beanOptions.beanFullName))
      ) {
        aopsMatched.push(aop.beanOptions.beanFullName);
      }
    }
    return aopsMatched;
  }
}

function __aopMatch(match: TypeDecoratorAopOptionsMatch, beanFullName: string) {
  if (!Array.isArray(match)) {
    return (
      (typeof match === 'string' && match === beanFullName) ||
      (match instanceof RegExp && cast<RegExp>(match).test(beanFullName))
    );
  }
  return match.some(item => __aopMatch(item, beanFullName));
}
