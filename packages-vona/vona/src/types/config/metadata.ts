import { IConnectionRecord } from '../interface/connection.js';
import { IGuardRecord } from '../interface/guard.js';
import { IInterceptorRecord } from '../interface/interceptor.js';
import { IMiddlewareRecord } from '../interface/middleware.js';
import { IPacketRecord } from '../interface/packet.js';
import { IPipeRecord } from '../interface/pipe.js';

export interface ConfigMetadata {
  middleware: IMiddlewareRecord;
  guard: IGuardRecord;
  interceptor: IInterceptorRecord;
  pipe: IPipeRecord;
  connection: IConnectionRecord;
  packet: IPacketRecord;
}
