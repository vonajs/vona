import { IPipeRecordLocal } from '../../../types/interface/pipe.js';

export interface ArgumentPipeResult<T extends keyof IPipeRecordLocal> {
  pipeName: T;
  options?: IPipeRecordLocal[T];
}

export type ArgumentPipeResultFn<T extends keyof IPipeRecordLocal> = () => ArgumentPipeResult<T>;

export function createArgumentPipe<T extends keyof IPipeRecordLocal>(
  pipeName: T,
  options?: Partial<IPipeRecordLocal[T]>,
) {
  return {
    pipeName,
    options,
  };
}

export function createArgumentPipeParse<T extends keyof IPipeRecordLocal>(pipeName: T) {
  return function (options?: Partial<IPipeRecordLocal[T]>): any {
    if (!options) return createArgumentPipe(pipeName);
    return () => {
      return createArgumentPipe(pipeName, options);
    };
  };
}
