import { IPipeRecordLocal } from '../../../types/interface/pipe.js';

export interface ArgumentPipeResult<T extends keyof IPipeRecordLocal> {
  pipeName: T;
  options?: IPipeRecordLocal[T];
}

export type ArgumentPipeResultFn<T extends keyof IPipeRecordLocal> = () => ArgumentPipeResult<T>;

export function createArgumentPipe<T extends keyof IPipeRecordLocal>(pipeName: T, options?: IPipeRecordLocal[T]) {
  return {
    pipeName,
    options,
  };
}
