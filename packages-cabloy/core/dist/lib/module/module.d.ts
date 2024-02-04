import { IModule } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
export declare class ModuleTools extends BeanSimple {
    prepare(): Promise<Record<string, IModule>>;
    load(): Promise<void>;
    monkey(monkeyName: any): Promise<void>;
}
//# sourceMappingURL=module.d.ts.map