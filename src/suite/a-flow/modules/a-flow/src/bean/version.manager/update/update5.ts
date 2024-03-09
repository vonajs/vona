import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: aFlow
    await this.bean.model.alterTable('aFlow', function (table) {
      table.int0('flowAtomClassId');
    });

    // alter table: aFlowHistory
    await this.bean.model.alterTable('aFlowHistory', function (table) {
      table.int0('flowAtomClassId');
    });

    // adjust flows
    await this._adjustFlows();
  }

  async _adjustFlows() {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._adjustFlowsInstance();
        },
      });
    }
  }

  async _adjustFlowsInstance() {
    // flow
    let flows = await this.ctx.model.flow.select({
      where: {
        flowAtomId: {
          op: '>',
          val: 0,
        },
      },
    });
    for (const flow of flows) {
      const flowAtomId = flow.flowAtomId;
      const atom = await this.ctx.bean.atom.model.get({ id: flowAtomId });
      if (atom) {
        await this.ctx.model.flow.update({ id: flow.id, flowAtomClassId: atom.atomClassId });
      }
    }
    // flow history
    flows = await this.ctx.model.flowHistory.select({
      where: {
        flowAtomId: {
          op: '>',
          val: 0,
        },
      },
    });
    for (const flow of flows) {
      const flowAtomId = flow.flowAtomId;
      const atom = await this.ctx.bean.atom.model.get({ id: flowAtomId });
      if (atom) {
        await this.ctx.model.flowHistory.update({ id: flow.id, flowAtomClassId: atom.atomClassId });
      }
    }
  }
}
