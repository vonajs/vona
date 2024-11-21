import { IPipeRecord } from '../../../types/interface/pipe.js';

export interface ArgumentPipeInfo<T extends keyof IPipeRecord> {
  pipeName: T;
  options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T];
  optionsPrimitive?: boolean;
}

export type ArgumentPipeInfoFn<T extends keyof IPipeRecord> = () => ArgumentPipeInfo<T>;

export function createArgumentPipeInfo<T extends keyof IPipeRecord>(
  pipeName: T,
  options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T],
  optionsPrimitive?: boolean,
): ArgumentPipeInfo<T> {
  return {
    pipeName,
    options,
    optionsPrimitive,
  };
}

export function createArgumentPipe<T extends keyof IPipeRecord>(pipeName: T, optionsPrimitive?: boolean) {
  return function (options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T]): any {
    if (options === undefined) return createArgumentPipeInfo(pipeName, undefined, optionsPrimitive);
    return () => {
      return createArgumentPipeInfo(pipeName, options, optionsPrimitive);
    };
  };
}
