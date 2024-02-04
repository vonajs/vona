declare function _exports(app: any): {
    new (): {
        __callerId: any;
        channelName: string | null;
        sub: any;
        pub: any;
        init(): void;
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
    };
};
export = _exports;
//# sourceMappingURL=broadcastClient.d.ts.map