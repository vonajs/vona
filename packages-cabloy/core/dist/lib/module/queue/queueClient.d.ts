import * as bull from 'bullmq';
import { IQueueCallbacks, IQueueQueue, IQueueQueues, IQueueWork, IQueueWorks } from '../../../types/index.js';
import { BeanSimple } from '../../bean/beanSimple.js';
export declare class QueueClient extends BeanSimple {
    _workers: IQueueWorks;
    _queues: IQueueQueues;
    _queueCallbacks: IQueueCallbacks;
    push(info: any): void;
    pushAsync(info: any): Promise<unknown>;
    _clearWorkers(): Promise<void>;
    _createWorker(info: any, queueKey: any): IQueueWork;
    _createQueue(info: any, queueKey: any): IQueueQueue;
    _ensureWorker(info: any): void;
    _ensureQueue(info: any): IQueueQueue;
    _getQueue(info: any): bull.Queue<any, any, string>;
    _callCallback(jobId: any, failedReason: any, data: any): void;
    _queuePush(info: any, isAsync: any): Promise<unknown>;
    _combineQueueKey({ subdomain, module, queueName }: {
        subdomain: any;
        module?: string | undefined;
        queueName?: string | undefined;
    }): string;
    _performTask(job: any): Promise<any>;
    _getRepeatKey(name: any, repeat: any): string;
}
//# sourceMappingURL=queueClient.d.ts.map