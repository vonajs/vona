import { Next } from '../../lib/decorator/type/function.js';
import { IOnionOptionsBase, IOnionOptionsDeps } from './onion.js';

export interface ISocketPacketRecord {}

export interface ISocketPacketExecute {
  execute(packet: any[], options: IDecoratorSocketPacketOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketPacketOptions
  extends IOnionOptionsBase,
    IOnionOptionsDeps<keyof ISocketPacketRecord> {}
