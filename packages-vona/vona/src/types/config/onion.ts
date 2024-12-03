import { IAopRecord } from '../interface/aop.js';
import { IConnectionRecord } from '../interface/connection.js';
import { IEntityRecord } from '../interface/entity.js';
import { IFilterRecord } from '../interface/filter.js';
import { IGuardRecord } from '../interface/guard.js';
import { IInterceptorRecord } from '../interface/interceptor.js';
import { IMiddlewareRecord } from '../interface/middleware.js';
import { IModelRecord } from '../interface/model.js';
import { IPacketRecord } from '../interface/packet.js';
import { IPipeRecord } from '../interface/pipe.js';
import { OmitNever } from '../utils/omitNever.js';

export interface ConfigOnion {
  middleware: OmitNever<IMiddlewareRecord>;
  guard: OmitNever<IGuardRecord>;
  interceptor: OmitNever<IInterceptorRecord>;
  pipe: OmitNever<IPipeRecord>;
  filter: OmitNever<IFilterRecord>;
  connection: OmitNever<IConnectionRecord>;
  packet: OmitNever<IPacketRecord>;
  aop: OmitNever<IAopRecord>;
  entity: OmitNever<IEntityRecord>;
  model: OmitNever<IModelRecord>;
}
