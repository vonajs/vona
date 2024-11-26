import { IConnectionRecord } from '../interface/connection.js';
import { IGuardRecord } from '../interface/guard.js';
import { IInterceptorRecord } from '../interface/interceptor.js';
import { IMiddlewareRecord } from '../interface/middleware.js';
import { IPacketRecord } from '../interface/packet.js';
import { IPipeRecord } from '../interface/pipe.js';
import { RemoveNever } from '../utils/removeNever.js';

export interface ConfigMetadata {
  middleware: RemoveNever<IMiddlewareRecord>;
  guard: RemoveNever<IGuardRecord>;
  interceptor: RemoveNever<IInterceptorRecord>;
  pipe: RemoveNever<IPipeRecord>;
  connection: RemoveNever<IConnectionRecord>;
  packet: RemoveNever<IPacketRecord>;
}
