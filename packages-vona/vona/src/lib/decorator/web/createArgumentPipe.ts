import { IPipeRecord } from '../../../types/interface/pipe.js';

export interface ArgumentPipeResult<T extends keyof IPipeRecord> {
  pipeName: T;
  options?: IPipeRecord[T];
  optionsPrimitive?: boolean;
}

export type ArgumentPipeResultFn<T extends keyof IPipeRecord> = () => ArgumentPipeResult<T>;

export function createArgumentPipe<T extends keyof IPipeRecord>(
  pipeName: T,
  options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T],
  optionsPrimitive?: boolean,
) {
  return {
    pipeName,
    options,
    optionsPrimitive,
  };
}

export function createArgumentPipeParse<T extends keyof IPipeRecord>(pipeName: T, optionsPrimitive?: boolean) {
  return function (options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T]): any {
    if (options === undefined) return createArgumentPipe(pipeName, undefined, optionsPrimitive);
    return () => {
      return createArgumentPipe(pipeName, options, optionsPrimitive);
    };
  };
}
