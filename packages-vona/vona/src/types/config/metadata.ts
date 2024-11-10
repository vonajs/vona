import { IGuardRecord } from '../interface/guard.js';
import { IMiddlewareRecord } from '../interface/middleware.js';

export interface ConfigMetadata {
  middleware: IMiddlewareRecord;
  guard: IGuardRecord;
}
