import { IBroadcastExecuteContext } from '../../../type/index.js';
import { BeanSimple } from '../bean/beanBase.js';

export class BroadcastClient extends BeanSimple {
  __callerId: string = '';
  channelName: string | null = null;
  sub: any = null;
  pub: any = null;

  protected __init__() {
    const app = this.app;
    this.__callerId = app.meta.workerId;
    this.channelName = `broadcast_${this.app.name}:`;
    this.pub = app.redis.get('broadcast').duplicate();
    this.sub = app.redis.get('broadcast').duplicate();
    this.sub.subscribe(this.channelName, function () {});
    this.sub.on('message', (_channel, info) => {
      this._performTasks(JSON.parse(info))
        .then(() => {
          // do nothing
        })
        .catch(err => {
          app.logger.error(err);
        });
    });
  }

  // { locale, subdomain, module, broadcastName, data }
  emit(info) {
    info.__callerId = this.__callerId;
    this.pub.publish(this.channelName, JSON.stringify(info));
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
    return await app.meta.util.executeBean({
      locale,
      subdomain,
      context,
      beanModule: bean.module,
      beanFullName: `${bean.module}.broadcast.${bean.name}`,
      transaction: broadcast.config.transaction,
    });
  }
}
