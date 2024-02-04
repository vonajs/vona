import { BeanSimple } from '../bean/beanSimple.js';
import { CabloyApplication } from '../../types/index.js';
interface IMessengerCallbackContext {
    name: string;
    data: any;
}
type IMessengerCallback = (info: IMessengerCallbackContext) => void;
export declare class AppMessenger extends BeanSimple {
    _providers: object;
    _pids: any;
    protected __init__(): void;
    callAgent(info: any, cb?: IMessengerCallback): void;
    callRandom(info: any, cb?: IMessengerCallback): void;
    callTo(pid: any, info: any, cb?: IMessengerCallback): void;
    callAll(info: any): void;
    _call(pid: any, info: any, cb?: IMessengerCallback): void;
    sendToApp(eventName: any, info: any): void;
    sendTo(pid: any, eventName: any, info: any): void;
    sendRandom(eventName: any, info: any): void;
    sendAgent(eventName: any, info: any): void;
    addProvider(provider: any): void;
}
export default function (app: CabloyApplication): void;
export {};
//# sourceMappingURL=messenger.d.ts.map