import { IAopRecord } from '../interface/aop.js';
import { IMetaRecord } from '../interface/meta.js';
import { ISocketConnectionRecord } from '../interface/socketConnection.js';
import { ISocketPacketRecord } from '../interface/socketPacket.js';
import { IStartupRecord } from '../interface/startup.js';
import { OmitNever } from '../utils/omitNever.js';

export interface ConfigOnions {
  socketConnection: OmitNever<ISocketConnectionRecord>;
  socketPacket: OmitNever<ISocketPacketRecord>;
  aop: OmitNever<IAopRecord>;
  meta: OmitNever<IMetaRecord>;
  startup: OmitNever<IStartupRecord>;
}
