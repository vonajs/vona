import { Constructable, IDecoratorBeanOptionsBase, IDecoratorUseOptionsBase } from '../decorator/index.js';
import { MetadataKey } from './metadata.js';
import { IBeanRecord } from '../bean/type.js';
import { BeanSimple } from '../bean/beanSimple.js';
export declare const DecoratorBeanFullName: unique symbol;
export declare const DecoratorUse: unique symbol;
export declare class AppResource extends BeanSimple {
    beans: Record<string, IDecoratorBeanOptionsBase>;
    aops: Record<string, IDecoratorBeanOptionsBase>;
    addUse(target: object, options: IDecoratorUseOptionsBase): void;
    getUses(target: object): Record<MetadataKey, IDecoratorUseOptionsBase>;
    addAop<T>(options: Partial<IDecoratorBeanOptionsBase<T>>): IDecoratorBeanOptionsBase<T>;
    findAopsMatched<T>(A: Constructable<T>): string[] | undefined;
    findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): string[] | undefined;
    findAopsMatched(beanFullName: string): string[] | undefined;
    addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>): IDecoratorBeanOptionsBase<T>;
    getBeanFullName<T>(A: Constructable<T>): string | undefined;
    getBean<T>(A: Constructable<T>): IDecoratorBeanOptionsBase<T> | undefined;
    getBean<K extends keyof IBeanRecord>(beanFullName: K): IDecoratorBeanOptionsBase<IBeanRecord[K]> | undefined;
    getBean<T>(beanFullName: string): IDecoratorBeanOptionsBase<T> | undefined;
    _parseBeanName<T>(beanClass: Constructable<T>, scene?: string, name?: string): string;
    _parseModuleBelong(module: any, beanClass: any, virtual: any): any;
    _getModuleBelong<T>(A: Constructable<T>): string;
    _getModuleBelong<K extends keyof IBeanRecord>(beanFullName: K): string;
    _getModuleBelong(beanFullName: string): string;
}
export declare const appResource: AppResource;
//# sourceMappingURL=resource.d.ts.map