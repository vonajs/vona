import { IMiddlewareBase, Next } from './middleware.js';

export interface IPacketRecord {}

export interface IPacketExecute {
  execute(packet: any[], options: IDecoratorPacketOptions, next: Next): Promise<any>;
}

export interface IDecoratorPacketOptions extends IMiddlewareBase {
  dependencies?: (keyof IPacketRecord)[] | keyof IPacketRecord;
  dependents?: (keyof IPacketRecord)[] | keyof IPacketRecord;
}
