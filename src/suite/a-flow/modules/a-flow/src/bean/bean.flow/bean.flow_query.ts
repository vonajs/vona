import { BigNumber } from 'bignumber.js';
import { BeanFlowLoad } from './bean.flow_load.js';

export class BeanFlowQuery extends BeanFlowLoad {
  async count({ options, user }: any): Promise<BigNumber> {
    return (await this._select({ options, user, count: 1 })) as BigNumber;
  }

  async select({ options, user, pageForce = true }: any) {
    return (await this._select({ options, user, pageForce, count: 0 })) as any[];
  }

  async _select({ options, user, pageForce = true, count = 0 }: any) {
    const items = await this._list({ options, user, pageForce, count });
    if (count === 1) return items as BigNumber;
    for (const item of items as any[]) {
      if (item.flowNodeNameCurrent) {
        item.flowNodeNameCurrentLocale = this.app.text(item.flowNodeNameCurrent);
      }
      if (item.flowRemark) {
        item.flowRemarkLocale = this.app.text(item.flowRemark);
      }
    }
    return items;
  }

  async get({ flowId, history, user }: any) {
    // check viewWorkflow
    if (user && user.id) {
      const res = await this.app.bean.flowTask._checkViewWorkflow_checkRightAction({ flowId, user });
      if (res) {
        user = { id: 0 };
      }
    }
    return await this._get({ flowId, history, user });
  }

  async _get({ flowId, history, user }: any) {
    // where
    const where: any = {};
    if (history) {
      where['a.flowId'] = flowId;
    } else {
      where['a.id'] = flowId;
    }
    const flows = await this.select({
      options: {
        where,
        mode: history ? 'history' : 'flowing',
      },
      user,
    });
    return flows[0];
  }

  // mode: mine/others/flowing/history
  async _list({ options: { where, orders, page, mode }, user, pageForce = true, count = 0 }) {
    page = this.app.bean.util.page(page, pageForce);
    const items = await this.self.sqlProcedure.selectFlows({
      iid: this.ctx.instance.id,
      userIdWho: user ? user.id : 0,
      where,
      orders,
      page,
      count,
      mode,
    });
    return count ? this.bean.model.extractCount(items) : items;
  }
}
