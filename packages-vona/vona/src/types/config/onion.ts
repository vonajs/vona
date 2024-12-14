import { IAopRecord } from '../interface/aop.js';
import { IMetaRecord } from '../interface/meta.js';
import { IMiddlewareRecord } from '../interface/middleware.js';
import { ISocketConnectionRecord } from '../interface/socketConnection.js';
import { ISocketPacketRecord } from '../interface/socketPacket.js';
import { IStartupRecord } from '../interface/startup.js';
import { OmitNever } from '../utils/omitNever.js';

export interface ConfigOnions {
  middleware: OmitNever<IMiddlewareRecord>;
  socketConnection: OmitNever<ISocketConnectionRecord>;
  socketPacket: OmitNever<ISocketPacketRecord>;
  aop: OmitNever<IAopRecord>;
  meta: OmitNever<IMetaRecord>;
  startup: OmitNever<IStartupRecord>;
}
