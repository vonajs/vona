import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.js';
import { Aspect } from 'vona-module-a-aspect';

export function Log(options?: Partial<IAopMethodOptionsLog>): MethodDecorator {
  return Aspect.aopMethod('a-logger:log', options);
}
