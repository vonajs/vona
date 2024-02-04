declare function _exports(app: any): {
    new (): {
        _workers: {};
        _queues: {};
        _queueCallbacks: {};
        push(info: any): void;
        pushAsync(info: any): any;
        _clearWorkers(): Promise<void>;
        _createWorker(info: any, queueKey: any): {
            redlock: any;
            worker: bull.Worker<any, any, string>;
        };
        _createQueue(info: any, queueKey: any): {
            queue: bull.Queue<any, any, string>;
            queueEvents: bull.QueueEvents;
        };
        _ensureWorker(info: any): void;
        _ensureQueue(info: any): any;
        _getQueue(info: any): any;
        _callCallback(jobId: any, failedReason: any, data: any): void;
        _queuePush(info: any, isAsync: any): any;
        _combineQueueKey({ subdomain, module, queueName }: {
            subdomain: any;
            module?: string | undefined;
            queueName?: string | undefined;
        }): string;
        _performTask(job: any): Promise<any>;
        _getRepeatKey(name: any, repeat: any): string;
    };
};
export = _exports;
//# sourceMappingURL=queueClient.d.ts.map