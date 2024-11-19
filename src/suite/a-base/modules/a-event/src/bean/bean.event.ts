import { Bean, BeanModuleScopeBase } from 'vona';

const __adapter = (_context, chain) => {
  const eventBean = chain;
  return {
    receiver: eventBean,
    fn: eventBean.execute,
  };
};

@Bean()
export class BeanEvent extends BeanModuleScopeBase {
  async invoke({ module, name, data, result, next }: any) {
    const eventArray = this._getEventArray({ module, name });
    const eventBeanArray = eventArray.map(item => {
      const eventBean = this.app.bean._getBean(item);
      if (!eventBean) throw new Error(`event not found: ${item}`);
      if (!eventBean.execute) throw new Error(`event.execute not found: ${item}`);
      return eventBean;
    });
    // context
    const context = {
      data,
      result,
    };
    // invoke
    await this.ctx.app.meta.util.composeAsync(eventBeanArray, __adapter)(context, async (context, _next) => {
      if (next) {
        await next(context, _next);
      } else {
        await _next();
      }
    });
    // ok
    return context.result;
  }

  _getEventArray({ module, name }: any) {
    module = module || this.moduleScope;
    const key = `${module}:${name}`;
    const events = this.app.bean.util.getPropertyObject(this.ctx.app.meta, 'events');
    if (events[key]) return events[key];
    events[key] = this._collectEventArray(key);
    return events[key];
  }

  _collectEventArray(key) {
    const eventArray: any[] = [];
    for (const module of this.ctx.app.meta.modulesArray) {
      const implementations = module.meta && module.meta.event && module.meta.event.implementations;
      if (!implementations) continue;
      // bean
      const implementationName = implementations[key];
      if (!implementationName) continue;
      const beanFullName = this.bean.util.combineBeanFullName({
        module: module.info.relativeName,
        scene: 'event',
        bean: implementationName,
      });
      eventArray.push(beanFullName);
    }
    return eventArray;
  }
}
