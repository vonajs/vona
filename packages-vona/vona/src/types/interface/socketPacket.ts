import { IMiddlewareBase, Next } from './middleware.js';

export interface ISocketPacketRecord {}

export interface ISocketPacketExecute {
  execute(packet: any[], options: IDecoratorSocketPacketOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketPacketOptions extends IMiddlewareBase {
  dependencies?: (keyof ISocketPacketRecord)[] | keyof ISocketPacketRecord;
  dependents?: (keyof ISocketPacketRecord)[] | keyof ISocketPacketRecord;
}
