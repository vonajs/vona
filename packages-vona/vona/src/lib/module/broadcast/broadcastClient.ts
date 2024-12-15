import { cast, IBroadcastExecuteContext } from '../../../types/index.js';
import { BeanSimple } from '../../bean/beanSimple.js';

export class BroadcastClient extends BeanSimple {
  protected __init__() {}

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
