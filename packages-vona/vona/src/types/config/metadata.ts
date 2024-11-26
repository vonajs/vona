import { IConnectionRecord } from '../interface/connection.js';
import { IGuardRecord } from '../interface/guard.js';
import { IInterceptorRecord } from '../interface/interceptor.js';
import { IMiddlewareRecord } from '../interface/middleware.js';
import { IPacketRecord } from '../interface/packet.js';
import { IPipeRecord } from '../interface/pipe.js';
import { OmitNever } from '../utils/removeNever.js';

export interface ConfigMetadata {
  middleware: OmitNever<IMiddlewareRecord>;
  guard: OmitNever<IGuardRecord>;
  interceptor: OmitNever<IInterceptorRecord>;
  pipe: OmitNever<IPipeRecord>;
  connection: OmitNever<IConnectionRecord>;
  packet: OmitNever<IPacketRecord>;
}
