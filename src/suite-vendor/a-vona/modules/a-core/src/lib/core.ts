import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IMiddlewareOptionsGate } from '../bean/middleware.gate.ts';
import { Aspect } from 'vona-module-a-aspect';

function Gate(
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IMiddlewareOptionsGate>>,
): ClassDecorator & MethodDecorator {
  return Aspect.middlewareGlobal('a-core:gate', options);
}

export const Core = {
  gate: Gate,
};
