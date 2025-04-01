import type { Redis } from 'ioredis';
import type { IBroadcastExecute, IBroadcastJobContext, IDecoratorBroadcastOptions } from '../types/broadcast.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceBroadcast extends BeanBase {
  private __callerId: string;
  private __channelName: string;
  private __sub: Redis;
  private __pub: Redis;

  protected __init__() {
    const app = this.app;
    this.__callerId = app.bean.worker.id;
    this.__channelName = `broadcast_${this.app.name}:`;
    this.__pub = app.bean.redis.get('broadcast').duplicate();
    this.__sub = app.bean.redis.get('broadcast').duplicate();
    this.__sub.subscribe(this.__channelName, () => {});
    this.__sub.on('message', (_channel, info) => {
      this._performTask(JSON.parse(info))
        .then(() => {
          // do nothing
        })
        .catch((err: Error) => {
          this.$logger.error(err);
        });
    });
  }

  public async disposePub() {
    await this.__pub?.quit();
  }

  public async disposeSub() {
    await this.__sub?.quit();
  }

  emit<DATA>(info: IBroadcastJobContext<DATA>) {
    info.callerId = this.__callerId;
    this.__pub.publish(this.__channelName, JSON.stringify(info));
  }

  async _performTask<DATA>(info: IBroadcastJobContext<DATA>) {
    // isEmitter
    const isEmitter = info.callerId === this.__callerId;
    // broadcast config
    const broadcastItem = this.bean.onion.broadcast.getOnionSlice(info.broadcastName);
    const broadcastConfig = this.bean.onion.broadcast.getOnionOptions<IDecoratorBroadcastOptions>(info.broadcastName);
    // execute
    return await this.bean.executor.newCtx(
      async () => {
        const beanFullName = broadcastItem.beanOptions.beanFullName;
        const beanInstance = <IBroadcastExecute<DATA>> this.app.bean._getBean(beanFullName as any);
        return await beanInstance.execute(info.data, isEmitter);
      },
      {
        dbInfo: info.options?.dbInfo,
        locale: info.options?.locale,
        instanceName: info.options?.instanceName,
        extraData: info.options?.extraData,
        transaction: broadcastConfig?.transaction,
        instance: broadcastConfig?.instance !== false,
      },
    );
  }
}
