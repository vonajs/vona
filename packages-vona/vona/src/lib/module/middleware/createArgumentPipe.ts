import { IPipeRecordLocal } from '../../../types/interface/pipe.js';

export function createArgumentPipe<T extends keyof IPipeRecordLocal>(pipeName: T, options?: IPipeRecordLocal[T]) {
  return {
    pipeName,
    options,
  };
}
