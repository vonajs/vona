import { BeanSimple } from './beanSimple.js';
declare const BeanModuleScope: unique symbol;
declare const BeanModuleScene: unique symbol;
export declare class BeanScopeScene extends BeanSimple {
    private [BeanModuleScope];
    private [BeanModuleScene];
    private __instances;
    constructor(moduleScope: any, scene: any);
    protected __get__(prop: any): any;
}
export {};
//# sourceMappingURL=beanScopeScene.d.ts.map