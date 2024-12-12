import { IAopRecord } from '../interface/aop.js';
import { IControllerRecord } from '../interface/controller.js';
import { IEntityRecord } from '../interface/entity.js';
import { IFilterRecord } from '../interface/filter.js';
import { IGuardRecord } from '../interface/guard.js';
import { IInterceptorRecord } from '../interface/interceptor.js';
import { IMetaRecord } from '../interface/meta.js';
import { IMiddlewareRecord } from '../interface/middleware.js';
import { IPipeRecord } from '../interface/pipe.js';
import { ISocketConnectionRecord } from '../interface/socketConnection.js';
import { ISocketPacketRecord } from '../interface/socketPacket.js';
import { IStartupRecord } from '../interface/startup.js';
import { OmitNever } from '../utils/omitNever.js';

export interface ConfigOnions {
  middleware: OmitNever<IMiddlewareRecord>;
  guard: OmitNever<IGuardRecord>;
  interceptor: OmitNever<IInterceptorRecord>;
  pipe: OmitNever<IPipeRecord>;
  filter: OmitNever<IFilterRecord>;
  socketConnection: OmitNever<ISocketConnectionRecord>;
  socketPacket: OmitNever<ISocketPacketRecord>;
  aop: OmitNever<IAopRecord>;
  entity: OmitNever<IEntityRecord>;
  controller: OmitNever<IControllerRecord>;
  meta: OmitNever<IMetaRecord>;
  startup: OmitNever<IStartupRecord>;
}
