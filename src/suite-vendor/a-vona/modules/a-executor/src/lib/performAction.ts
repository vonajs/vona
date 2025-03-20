import type { VonaContext } from 'vona';
import type { IPerformActionInnerParams } from '../types/executor.ts';
import http from 'node:http';
import { cast } from 'vona';
import { delegateProperties } from './utils.ts';

export async function performActionInner<T = any>({
  ctxCaller,
  innerAccess,
  method,
  path,
  query,
  headers,
  body,
  onions,
  authToken,
}: IPerformActionInnerParams): Promise<T> {

}
