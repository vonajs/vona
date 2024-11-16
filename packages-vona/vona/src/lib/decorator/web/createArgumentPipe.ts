import { IPipeRecordLocal } from '../../../types/interface/pipe.js';

export interface ArgumentPipeResult<T extends keyof IPipeRecordLocal> {
  pipeName: T;
  options?: IPipeRecordLocal[T];
  optionsPrimitive?: boolean;
}

export type ArgumentPipeResultFn<T extends keyof IPipeRecordLocal> = () => ArgumentPipeResult<T>;

export function createArgumentPipe<T extends keyof IPipeRecordLocal>(
  pipeName: T,
  options?: IPipeRecordLocal[T] extends object ? Partial<IPipeRecordLocal[T]> : IPipeRecordLocal[T],
  optionsPrimitive?: boolean,
) {
  return {
    pipeName,
    options,
    optionsPrimitive,
  };
}

export function createArgumentPipeParse<T extends keyof IPipeRecordLocal>(pipeName: T, optionsPrimitive?: boolean) {
  return function (
    options?: IPipeRecordLocal[T] extends object ? Partial<IPipeRecordLocal[T]> : IPipeRecordLocal[T],
  ): any {
    if (options === undefined) return createArgumentPipe(pipeName, undefined, optionsPrimitive);
    return () => {
      return createArgumentPipe(pipeName, options, optionsPrimitive);
    };
  };
}
