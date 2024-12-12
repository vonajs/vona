import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // all instances
    const instances = await this.app.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._updateAtomsInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _updateAtomsInstance() {
    // throw new Error('');
  }
}
