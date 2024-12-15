import { Service } from 'vona-module-a-web';
import { IBroadcastJobContext } from '../types/broadcast.js';
import { BeanBase, IORedis } from 'vona';

@Service()
export class ServiceBroadcast extends BeanBase {
  private __callerId: string;
  private __channelName: string;
  private __sub: IORedis.Redis;
  private __pub: IORedis.Redis;

  protected __init__() {
    const app = this.app;
    this.__callerId = app.meta.workerId;
    this.__channelName = `broadcast_${this.app.name}:`;
    this.__pub = app.redis.get('broadcast').duplicate();
    this.__sub = app.redis.get('broadcast').duplicate();
    this.__sub.subscribe(this.__channelName, function () {});
    this.__sub.on('message', (_channel, info) => {
      this._performTasks(JSON.parse(info))
        .then(() => {
          // do nothing
        })
        .catch((err: Error) => {
          app.logger.error(err);
        });
    });
  }

  emit<DATA>(info: IBroadcastJobContext<DATA>) {
    info.callerId = this.__callerId;
    this.__pub.publish(this.__channelName, JSON.stringify(info));
  }

  async _performTasks({ __callerId, locale, subdomain, module, broadcastName, data }) {
    const app = this.app;
    // context
    const context: IBroadcastExecuteContext = { data };
    if (__callerId === this.__callerId) {
      context.sameAsCaller = true;
    }
    // broadcasts
    const broadcastArray = app.meta.broadcasts[`${module}:${broadcastName}`];
    if (!broadcastArray) return;
    // loop
    for (const broadcast of broadcastArray) {
      await this._performTask({ broadcast, context, locale, subdomain });
    }
  }

  async _performTask({ broadcast, context, locale, subdomain }) {
    const app = this.app;
    const bean = broadcast.bean;
    // execute as global when broadcast.config.instance === false
    // ignore when instance not started
    const instanceStarted = app.meta.util.instanceStarted(subdomain);
    if (!instanceStarted && broadcast.config.instance !== false) return;
    // execute
    // todo: 需要重构
    return await cast(this.bean).executor.newCtx(
      async () => {
        const beanFullName = `${bean.module}.broadcast.${bean.name}`;
        const beanInstance = this.app.bean._getBean(beanFullName as any);
        return await cast(beanInstance).execute(context);
      },
      {
        locale,
        subdomain,
        transaction: broadcast.config.transaction,
      },
    );
  }
}
