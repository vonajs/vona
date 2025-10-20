import type { IFilterOptionsError } from 'vona-module-a-error';
import type { TypeUseOnionOmitOptionsGlobal } from 'vona-module-a-onion';
import type { IMiddlewareOptionsGate } from '../bean/middleware.gate.ts';
import { Aspect } from 'vona-module-a-aspect';

function Gate(
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IMiddlewareOptionsGate>>,
): ClassDecorator & MethodDecorator {
  return Aspect.middlewareGlobal('a-core:gate', options);
}

function Error(
  options?: Partial<TypeUseOnionOmitOptionsGlobal<IFilterOptionsError>>,
): ClassDecorator & MethodDecorator {
  return Aspect.filterGlobal('a-error:error', options);
}

export const Core = {
  gate: Gate,
  error: Error,
};
