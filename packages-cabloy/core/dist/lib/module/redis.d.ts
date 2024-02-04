import Bottleneck from 'bottleneck';
import { CabloyApplication } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
export declare class AppLimiter extends BeanSimple {
    create(options: any): Bottleneck;
}
export declare class AppRedlock extends BeanSimple {
    create(options: any): any;
}
export default function (app: CabloyApplication): void;
//# sourceMappingURL=redis.d.ts.map