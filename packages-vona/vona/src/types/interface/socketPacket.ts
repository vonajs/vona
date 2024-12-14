import { Next } from '../../lib/decorator/type/function.js';
import { IOnionSliceBase } from './onion.js';

export interface ISocketPacketRecord {}

export interface ISocketPacketExecute {
  execute(packet: any[], options: IDecoratorSocketPacketOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketPacketOptions extends IOnionSliceBase {
  dependencies?: (keyof ISocketPacketRecord)[] | keyof ISocketPacketRecord;
  dependents?: (keyof ISocketPacketRecord)[] | keyof ISocketPacketRecord;
}
