import { CabloyApplication, IModule } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
export declare class AppRouter extends BeanSimple {
    register(info: any, route: any): void;
    unRegister(name: any): void;
    findByPath(moduleName: any, arg: any): any;
}
export default function (app: CabloyApplication, modules: Record<string, IModule>): void;
//# sourceMappingURL=route.d.ts.map