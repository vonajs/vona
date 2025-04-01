import type {
  IDecoratorQueueOptions,
  IQueueCallbacks,
  IQueueExecute,
  IQueueJobContext,
  IQueuePushOptions,
  IQueueQueue,
  IQueueQueues,
  IQueueRecord,
  IQueueWork,
  IQueueWorks,
  TypeQueueJob,
} from '../types/queue.ts';
import * as Bull from 'bullmq';
import { BeanBase, beanFullNameFromOnionName, deepExtend, instanceDesp, uuidv4 } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceQueue extends BeanBase {
  _workers: IQueueWorks = {};
  _queues: IQueueQueues = {};
  _queueCallbacks: IQueueCallbacks = {};

  push<DATA>(info: IQueueJobContext<DATA>) {
    if (!info.options?.dbInfo) throw new Error('should specify the options.dbInfo');
    this._queuePush(info, false);
  }

  // { locale, instanceName, module, queueName,queueNameSub,data }
  pushAsync<DATA, RESULT>(info: IQueueJobContext<DATA>): Promise<RESULT> {
    if (!info.options?.dbInfo) throw new Error('should specify the options.dbInfo');
    return this._queuePush(info, true);
  }

  loadQueueWorkers(instanceName?: string | undefined | null) {
    for (const queueItem of this.bean.onion.queue.getOnionsEnabled()) {
      const info: IQueueJobContext<unknown> = {
        queueName: queueItem.name as never,
        data: undefined as any,
        options: {
          instanceName,
        },
      };
      this._ensureWorker(info);
    }
  }

  async clearWorkers() {
    for (const queueKey in this._workers) {
      const _worker = this._workers[queueKey];
      await _worker.worker.close();
    }
    this._workers = {};
  }

  async clearQueues() {
    for (const queueKey in this._queues) {
      const _queue = this._queues[queueKey];
      await _queue.queue.close();
      await _queue.queueEvents.close();
    }
    this._queues = {};
  }

  _createWorker<DATA>(info: IQueueJobContext<DATA>, queueKey: string) {
    const app = this.app;
    // worker
    const _worker = {} as IQueueWork;
    // prefix
    const prefix = `bull_${app.name}:queue`;
    // queue config
    const queueConfig = app.bean.onion.queue.getOnionOptions<IDecoratorQueueOptions>(info.queueName);
    // queueConfig.options: queue/worker/job/redlock
    const workerOptions = queueConfig?.options?.worker;
    const redlockOptions = queueConfig?.options?.redlock;
    const _redlockOptions = Object.assign({}, this.$scope.redlock.config.redlock.options, redlockOptions);
    const _lockTTL = redlockOptions?.lockTTL ?? this.$scope.redlock.config.redlock.lockTTL;

    // redlock
    if (!queueConfig?.concurrency) {
      _worker.redlock = this.$scope.redlock.service.redlock.create(_redlockOptions);
    }

    // create work
    const connectionWorker = app.bean.redis.get('queue');
    const _workerOptions = Object.assign({}, this.scope.config.worker, workerOptions, {
      prefix,
      connection: connectionWorker,
    });
    _worker.workerOptions = _workerOptions;
    _worker.worker = new Bull.Worker(
      queueKey,
      async job => {
        // concurrency
        if (queueConfig?.concurrency) {
          return await this._performTask(job);
        }
        // redlock
        const info = job.data as IQueueJobContext<DATA>;
        const queueNameSub = info.options?.queueNameSub;
        const _lockResource = `queue:${queueKey}${queueNameSub ? `#${queueNameSub}` : ''}`;
        return await this.$scope.redlock.service.redlock.lock(
          _lockResource,
          async () => {
            return await this._performTask(job);
          },
          {
            // instanceName: job.data.instanceName, // need not
            redlock: _worker.redlock,
            lockTTL: _lockTTL,
          },
        );
      },
      _workerOptions,
    );

    _worker.worker.on('failed', (_job, err) => {
      this.$logger.error(err);
    });

    _worker.worker.on('error', err => {
      if (err.message && err.message.includes('Missing lock for job')) {
        const workerInner = _worker.worker as any;
        if (!workerInner.running) {
          _worker.worker.run().catch(err => {
            this.$logger.error(err);
          });
        }
      }
    });

    // ok
    return _worker;
  }

  _createQueue<DATA>(info: IQueueJobContext<DATA>, queueKey: string) {
    const app = this.app;
    // queue
    const _queue = {} as IQueueQueue;
    // prefix
    const prefix = `bull_${app.name}:queue`;
    // queue config
    const queueConfig = app.bean.onion.queue.getOnionOptions<IDecoratorQueueOptions>(info.queueName);
    // queueConfig.options: queue/worker/job/limiter
    const queueOptions = queueConfig?.options?.queue;

    // create queue
    const connectionQueue: Bull.ConnectionOptions = app.bean.redis.get('queue');
    const _queueOptions = Object.assign({}, queueOptions, { prefix, connection: connectionQueue });
    _queue.config = queueConfig;
    _queue.options = _queueOptions;
    _queue.queue = new Bull.Queue(queueKey, _queueOptions);

    // create events
    const connectionEvents: Bull.ConnectionOptions = app.bean.redis.get('queue');
    const _queueEventsOptions = { prefix, connection: connectionEvents };
    _queue.queueEventsOptions = _queueEventsOptions;
    _queue.queueEvents = new Bull.QueueEvents(queueKey, _queueEventsOptions);
    _queue.queueEvents.on('completed', ({ jobId, returnvalue }) => {
      this._callCallback(jobId, undefined, returnvalue);
    });
    _queue.queueEvents.on('failed', ({ jobId, failedReason }) => {
      this._callCallback(jobId, failedReason, undefined);
    });

    // ok
    return _queue;
  }

  _ensureWorker<DATA>(info: IQueueJobContext<DATA>) {
    // queueKey
    const queueKey = this._combineQueueKey(info);
    // worker
    if (!this._workers[queueKey]) {
      this._workers[queueKey] = this._createWorker(info, queueKey);
    }
  }

  _ensureQueue<DATA>(info: IQueueJobContext<DATA>) {
    // worker
    this._ensureWorker(info);
    // queueKey
    const queueKey = this._combineQueueKey(info);
    // queue
    if (!this._queues[queueKey]) {
      this._queues[queueKey] = this._createQueue(info, queueKey);
    }
    // ok
    return this._queues[queueKey];
  }

  getQueue(queueName: keyof IQueueRecord, instanceName?: string | undefined | null) {
    return this._getQueue({
      queueName,
      data: undefined as any,
      options: {
        instanceName: instanceName ?? this.ctx.instanceName,
      },
    });
  }

  _getQueue<DATA>(info: IQueueJobContext<DATA>) {
    return this._ensureQueue(info).queue;
  }

  _callCallback<DATA>(jobId: string | number, failedReason: string | undefined, data: DATA | undefined) {
    const _callback = this._queueCallbacks[jobId];
    if (_callback) {
      delete this._queueCallbacks[jobId];
      _callback.callback(failedReason ? new Error(failedReason) : undefined, data);
    }
  }

  async _queuePush<DATA, RESULT>(info: IQueueJobContext<DATA>, isAsync: boolean): Promise<RESULT> {
    // queue config
    const queueConfig = this.bean.onion.queue.getOnionOptions<IDecoratorQueueOptions>(info.queueName);
    // queueConfig.options: queue/worker/job/limiter
    const jobOptionsBase = queueConfig?.options?.job;
    // queue
    const queue = this._getQueue(info);
    // job
    const jobId = info.options?.jobOptions?.jobId || uuidv4();
    const jobName = info.options?.jobName || jobId;
    const jobOptions = deepExtend({ jobId }, jobOptionsBase, info.options?.jobOptions);
    // should not change info, hold original info.options?.jobName, info.options?.jobOptions
    // info = deepExtend({}, info, { options: { jobName, jobOptions } });
    // not async
    if (!isAsync) {
      // add job
      queue.add(jobName, info, jobOptions);
      return undefined as any;
    }
    // async
    return new Promise((resolve, reject) => {
      // callback
      this._queueCallbacks[jobId] = {
        info,
        callback: (err, data) => {
          if (err) return reject(err);
          resolve(data as unknown as RESULT);
        },
      };
      // add job
      return queue.add(jobName, info, jobOptions);
    });
  }

  _combineQueueKey<DATA>(info: IQueueJobContext<DATA>) {
    const instanceName = instanceDesp(info.options?.instanceName);
    return `${instanceName}||${beanFullNameFromOnionName(info.queueName, 'queue')}`;
  }

  async _performTask<DATA, RESULT>(job: TypeQueueJob<DATA, RESULT>) {
    const info = job.data;
    // queue config
    const queueItem = this.bean.onion.queue.getOnionSlice(info.queueName);
    const queueConfig = this.bean.onion.queue.getOnionOptions<IDecoratorQueueOptions>(info.queueName);
    // execute
    return await this.bean.executor.newCtx(
      async () => {
        const beanFullName = queueItem.beanOptions.beanFullName;
        const beanInstance = <IQueueExecute<DATA>> this.app.bean._getBean(beanFullName as any);
        return await beanInstance.execute(info.data, info.options, job);
      },
      {
        dbInfo: info.options?.dbInfo,
        locale: info.options?.locale,
        instanceName: info.options?.instanceName,
        extraData: info.options?.extraData,
        transaction: queueConfig?.transaction,
      },
    );
  }

  getRepeatKey(jobName: string, repeat: Bull.RepeatOptions) {
    const endDate = repeat.endDate ? new Date(repeat.endDate).getTime() : '';
    const tz = repeat.tz || '';
    const pattern = repeat.pattern;
    const suffix = (pattern || String(repeat.every)) || '';
    return `${jobName}:${endDate}:${tz}:${suffix}`;
  }

  prepareJobInfo<DATA>(queueName: keyof IQueueRecord, data: DATA, options?: IQueuePushOptions): IQueueJobContext<DATA> {
    options = this.$scope.executor.service.executor.prepareGeneralInfo(options);
    // info
    return { queueName, data, options };
  }
}
