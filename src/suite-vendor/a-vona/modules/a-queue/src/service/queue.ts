import * as Bull from 'bullmq';
import { BeanBase, deepExtend, subdomainDesp, uuidv4 } from 'vona';
import {
  IDecoratorQueueOptions,
  IQueueCallbacks,
  IQueueExecute,
  IQueueJobContext,
  IQueueQueue,
  IQueueQueues,
  IQueueRecord,
  IQueueWork,
  IQueueWorks,
  TypeQueueJob,
} from '../types/queue.js';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceQueue extends BeanBase {
  _workers: IQueueWorks = {};
  _queues: IQueueQueues = {};
  _queueCallbacks: IQueueCallbacks = {};

  push<DATA>(info: IQueueJobContext<DATA>) {
    if (!info.options?.dbLevel) throw new Error('should specify the options.dbLevel');
    this._queuePush(info, false);
  }

  // { locale, subdomain, module, queueName,queueNameSub,data }
  pushAsync<DATA, RESULT>(info: IQueueJobContext<DATA>): Promise<RESULT> {
    if (!info.options?.dbLevel) throw new Error('should specify the options.dbLevel');
    return this._queuePush(info, true);
  }

  loadQueueWorkers(subdomain: string) {
    for (const queueItem of this.bean.onion.queue.getOnionsEnabled()) {
      const info: IQueueJobContext<unknown> = {
        queueName: queueItem.name as never,
        data: undefined as any,
        options: {
          subdomain,
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

  _createWorker<DATA>(info: IQueueJobContext<DATA>, queueKey: string) {
    const app = this.app;
    // worker
    const _worker = {} as IQueueWork;
    // prefix
    const prefix = `bull_${app.name}:queue`;
    // queue config
    const queueConfig = app.bean.onion.queue.getOnionOptions<IDecoratorQueueOptions>(info.queueName);
    // queueConfig.options: queue/worker/job
    const workerOptions = queueConfig?.options?.worker;
    // create work
    const connectionWorker = app.bean.redis.get('queue').duplicate();
    const _workerOptions = Object.assign({}, this.scope.config.worker, workerOptions, {
      prefix,
      connection: connectionWorker,
    });
    _worker.worker = new Bull.Worker(queueKey, job => this._performTask(job), _workerOptions);
    _worker.worker.on('failed', (_job, err) => {
      app.logger.error(err);
    });
    _worker.worker.on('error', err => {
      if (err.message && err.message.indexOf('Missing lock for job') > -1) {
        const workerInner = _worker.worker as any;
        if (!workerInner.running) {
          _worker.worker.run().catch(error => {
            console.error(error);
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
    const connectionQueue: Bull.ConnectionOptions = app.bean.redis.get('queue').duplicate();
    const _queueOptions = Object.assign({}, queueOptions, { prefix, connection: connectionQueue });
    _queue.config = queueConfig;
    _queue.options = _queueOptions;
    _queue.queue = new Bull.Queue(queueKey, _queueOptions);

    // create events
    const connectionEvents: Bull.ConnectionOptions = app.bean.redis.get('queue').duplicate();
    _queue.queueEvents = new Bull.QueueEvents(queueKey, { prefix, connection: connectionEvents });
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

  getQueue(queueName: keyof IQueueRecord, subdomain?: string) {
    return this._getQueue({
      queueName,
      data: undefined as any,
      options: {
        subdomain: subdomain ?? this.ctx.subdomain,
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
    const queue = this._ensureQueue(info);
    // setGlobalConcurrency
    let globalConcurrency;
    if (!queue.config?.concurrency) {
      globalConcurrency = 1;
    } else {
      globalConcurrency = queue.config?.concurrency === true ? Infinity : queue.config?.concurrency;
    }
    await queue.queue.setGlobalConcurrency(globalConcurrency);
    // job
    const jobId = info.options?.jobOptions?.jobId || uuidv4();
    const jobName = info.options?.jobName || jobId;
    const jobOptions = deepExtend({ jobId }, jobOptionsBase, info.options?.jobOptions);
    // should not change info, hold original info.options?.jobName, info.options?.jobOptions
    // info = deepExtend({}, info, { options: { jobName, jobOptions } });
    // not async
    if (!isAsync) {
      // add job
      queue.queue.add(jobName, info, jobOptions);
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
      return queue.queue.add(jobName, info, jobOptions);
    });
  }

  _combineQueueKey<DATA>(info: IQueueJobContext<DATA>) {
    const subdomain = subdomainDesp(info.options?.subdomain);
    return `${subdomain}||${info.queueName.replace(':', '.queue.')}`;
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
        const beanInstance = <IQueueExecute<DATA>>this.app.bean._getBean(beanFullName as any);
        return await beanInstance.execute(info.data, info.options, job);
      },
      {
        locale: info.options?.locale,
        subdomain: info.options?.subdomain,
        dbLevel: info.options!.dbLevel,
        extraData: info.options?.extraData,
        transaction: queueConfig?.transaction,
      },
    );
  }

  getRepeatKey(jobName: string, repeat: Bull.RepeatOptions) {
    const endDate = repeat.endDate ? new Date(repeat.endDate).getTime() : '';
    const tz = repeat.tz || '';
    const pattern = repeat.pattern;
    const suffix = (pattern ? pattern : String(repeat.every)) || '';
    const jobId = repeat.jobId ? repeat.jobId : '';
    return `${jobName}:${jobId}:${endDate}:${tz}:${suffix}`;
  }
}
