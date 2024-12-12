import { BeanBase } from 'vona';

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
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustFlowsInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _adjustFlowsInstance() {
    // flow
    let flows = await this.$scope.flow.model.flow.select({
      where: {
        flowAtomId: {
          op: '>',
          val: 0,
        },
      },
    });
    for (const flow of flows) {
      const flowAtomId = flow.flowAtomId;
      const atom = await this.app.bean.atom.model.get({ id: flowAtomId });
      if (atom) {
        await this.$scope.flow.model.flow.update({ id: flow.id, flowAtomClassId: atom.atomClassId });
      }
    }
    // flow history
    flows = await this.$scope.flow.model.flowHistory.select({
      where: {
        flowAtomId: {
          op: '>',
          val: 0,
        },
      },
    });
    for (const flow of flows) {
      const flowAtomId = flow.flowAtomId;
      const atom = await this.app.bean.atom.model.get({ id: flowAtomId });
      if (atom) {
        await this.$scope.flow.model.flowHistory.update({ id: flow.id, flowAtomClassId: atom.atomClassId });
      }
    }
  }
}
