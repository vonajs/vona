import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { IQueueCallbacks, IQueueJobInfo, IQueueQueues, IQueueWorks } from '../lib/types.js';

@Service()
export class ServiceQueue extends BeanBase<ScopeModule> {
  _workers: IQueueWorks = {};
  _queues: IQueueQueues = {};
  _queueCallbacks: IQueueCallbacks = {};

  push<DATA>(info: IQueueJobInfo<DATA>) {
    if (!info.options?.dbLevel) throw new Error('should specify the options.dbLevel');
    this._queuePush(info, false);
  }

  // { locale, subdomain, module, queueName,queueNameSub,data }
  pushAsync<DATA>(info: IQueueJobInfo<DATA>) {
    if (!info.options?.dbLevel) throw new Error('should specify the options.dbLevel');
    return this._queuePush(info, true);
  }

  async _clearWorkers() {
    for (const queueKey in this._workers) {
      const _worker = this._workers[queueKey];
      await _worker.worker.close();
    }
    this._workers = {};
  }

  _createWorker(info, queueKey) {
    const app = this.app;
    // worker
    const _worker = {} as IQueueWork;
    // prefix
    const prefix = `bull_${app.name}:queue`;
    // queue config
    const queueConfig = app.meta.queues[`${info.module}:${info.queueName}`].config;
    // queueConfig.options: queue/worker/job/redlock
    const workerOptions = (queueConfig.options && queueConfig.options.worker) || null;
    const redlockOptions = (queueConfig.options && queueConfig.options.redlock) || null;
    const _redlockOptions = Object.assign({}, app.config.queue.redlock.options, redlockOptions);

    // redlock
    if (!queueConfig.concurrency) {
      _worker.redlock = app.meta.redlock.create(_redlockOptions);
    }

    // create work
    const connectionWorker = app.redis.get('queue').duplicate();
    const _workerOptions = Object.assign({}, app.config.queue.worker, workerOptions, {
      prefix,
      connection: connectionWorker,
    });
    _worker.worker = new Bull.Worker(
      queueKey,
      async job => {
        // concurrency
        if (queueConfig.concurrency) {
          return await this._performTask(job);
        }
        // redlock
        const _lockResource = `queue:${queueKey}${job.data.queueNameSub ? '#' + job.data.queueNameSub : ''}`;
        return await app.meta.util.lock({
          // subdomain: job.data.subdomain, // need not
          resource: _lockResource,
          options: _redlockOptions,
          redlock: _worker.redlock,
          fn: async () => {
            return await this._performTask(job);
          },
        });
      },
      _workerOptions,
    );

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

  _createQueue(info, queueKey) {
    const app = this.app;
    // queue
    const _queue = {} as IQueueQueue;
    // prefix
    const prefix = `bull_${app.name}:queue`;
    // queue config
    const queueConfig = app.meta.queues[`${info.module}:${info.queueName}`].config;
    // queueConfig.options: queue/worker/job/limiter
    const queueOptions = (queueConfig.options && queueConfig.options.queue) || null;

    // create queue
    const connectionQueue: Bull.ConnectionOptions = app.redis.get('queue').duplicate();
    const _queueOptions = Object.assign({}, queueOptions, { prefix, connection: connectionQueue });
    _queue.queue = new Bull.Queue(queueKey, _queueOptions);

    // create events
    const connectionEvents: Bull.ConnectionOptions = app.redis.get('queue').duplicate();
    _queue.queueEvents = new Bull.QueueEvents(queueKey, { prefix, connection: connectionEvents });
    _queue.queueEvents.on('completed', ({ jobId, returnvalue }) => {
      this._callCallback(jobId, null, returnvalue);
    });
    _queue.queueEvents.on('failed', ({ jobId, failedReason }) => {
      this._callCallback(jobId, failedReason, null);
    });

    // ok
    return _queue;
  }

  _ensureWorker(info) {
    // queueKey
    const queueKey = this._combineQueueKey(info);
    // worker
    if (!this._workers[queueKey]) {
      this._workers[queueKey] = this._createWorker(info, queueKey);
    }
  }

  _ensureQueue(info) {
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

  _getQueue(info) {
    return this._ensureQueue(info).queue;
  }

  _callCallback(jobId, failedReason, data) {
    const _callback = this._queueCallbacks[jobId];
    if (_callback) {
      delete this._queueCallbacks[jobId];
      _callback.callback(failedReason ? new Error(failedReason) : null, data);
    }
  }

  _queuePush(info, isAsync) {
    const app = this.app;
    // queue config
    const fullKey = `${info.module}:${info.queueName}`;
    const queueBase = app.meta.queues[fullKey];
    if (!queueBase) throw new Error(`queue config not found: ${fullKey}`);
    const queueConfig = queueBase.config;
    // queueConfig.options: queue/worker/job/limiter
    const jobOptions = (queueConfig.options && queueConfig.options.job) || null;
    // queue
    const queue = this._getQueue(info);
    // job
    const jobId = (info.jobOptions && info.jobOptions.jobId) || uuid.v4();
    const jobName = info.jobName || jobId;
    const _jobOptions = Object.assign({}, jobOptions, info.jobOptions);
    // not async
    if (!isAsync) {
      // add job
      return queue.add(jobName, info, _jobOptions);
    }
    // async
    return new Promise((resolve, reject) => {
      // jobId
      if (!_jobOptions.jobId) {
        _jobOptions.jobId = jobId;
      }
      // callback
      this._queueCallbacks[jobId] = {
        info,
        callback: (err, data) => {
          if (err) return reject(err);
          resolve(data);
        },
      };
      // add job
      return queue.add(jobName, info, _jobOptions);
    });
  }

  _combineQueueKey({ subdomain, module = '', queueName = '' }) {
    subdomain = subdomainDesp(subdomain);
    return `${subdomain}||${module}||${queueName}`;
  }

  async _performTask(job) {
    const app = this.app;
    let { locale, subdomain, module, queueName, queueNameSub, data, ctxParent, dbLevel } = job.data;
    // ctxParent
    if (!ctxParent) ctxParent = {};
    ctxParent.dbLevel = dbLevel - 1;
    // context
    const context = { job, data } as IQueueJobContext;
    if (queueNameSub) {
      context.queueNameSub = queueNameSub;
    }
    // queue config
    const queue = app.meta.queues[`${module}:${queueName}`];
    // bean
    const bean = queue.bean;
    // execute
    return await app.meta.util.executeBean({
      locale,
      subdomain,
      context,
      beanModule: bean.module,
      beanFullName: `${bean.module}.queue.${bean.name}`,
      transaction: queue.config.transaction,
      ctxParent,
    });
  }

  _getRepeatKey(name, repeat) {
    const endDate = repeat.endDate ? new Date(repeat.endDate).getTime() : '';
    const tz = repeat.tz || '';
    const suffix = (repeat.cron ? repeat.cron : String(repeat.every)) || '';
    const jobId = repeat.jobId ? repeat.jobId : '';
    return `${name}:${jobId}:${endDate}:${tz}:${suffix}`;
  }
}
