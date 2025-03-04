import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.js';
import { UseAopMethod } from 'vona-module-a-aspect';

export function Log(options?: Partial<IAopMethodOptionsLog>): MethodDecorator {
  return UseAopMethod('a-logger:log', options);
}
