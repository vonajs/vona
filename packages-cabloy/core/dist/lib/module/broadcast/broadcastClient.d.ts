import { BeanSimple } from '../../bean/beanSimple.js';
export declare class BroadcastClient extends BeanSimple {
    __callerId: string;
    channelName: string | null;
    sub: any;
    pub: any;
    protected __init__(): void;
    emit(info: any): void;
    _performTasks({ __callerId, locale, subdomain, module, broadcastName, data }: {
        __callerId: any;
        locale: any;
        subdomain: any;
        module: any;
        broadcastName: any;
        data: any;
    }): Promise<void>;
    _performTask({ broadcast, context, locale, subdomain }: {
        broadcast: any;
        context: any;
        locale: any;
        subdomain: any;
    }): Promise<any>;
}
//# sourceMappingURL=broadcastClient.d.ts.map