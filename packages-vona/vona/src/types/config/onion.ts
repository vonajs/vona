import { IMetaRecord } from '../interface/meta.js';
import { ISocketConnectionRecord } from '../interface/socketConnection.js';
import { ISocketPacketRecord } from '../interface/socketPacket.js';
import { OmitNever } from '../utils/omitNever.js';

export interface ConfigOnions {
  socketConnection: OmitNever<ISocketConnectionRecord>;
  socketPacket: OmitNever<ISocketPacketRecord>;
  meta: OmitNever<IMetaRecord>;
}
