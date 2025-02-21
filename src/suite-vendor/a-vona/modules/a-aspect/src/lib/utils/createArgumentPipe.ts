import type { IPipeRecord } from '../../types/pipe.ts';

export interface ArgumentPipeInfo<T extends keyof IPipeRecord> {
  pipeName: T;
  options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T];
}

export function createArgumentPipeInfo<T extends keyof IPipeRecord>(
  pipeName: T,
  options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T],
): ArgumentPipeInfo<T> {
  return {
    pipeName,
    options,
  };
}

export function createArgumentPipe<T extends keyof IPipeRecord>(pipeName: T) {
  return function (options?: IPipeRecord[T] extends object ? Partial<IPipeRecord[T]> : IPipeRecord[T]): any {
    if (options === undefined) return createArgumentPipeInfo(pipeName);
    return () => {
      return createArgumentPipeInfo(pipeName, options);
    };
  };
}
