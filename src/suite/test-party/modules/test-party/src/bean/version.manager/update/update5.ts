import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    console.log('subdomain: ', this.ctx.subdomain);
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async () => {
          await this._updateAtomsInstance();
        },
      });
    }
  }

  async _updateAtomsInstance() {
    console.log('subdomain: ', this.ctx.subdomain);
    // throw new Error('');
  }
}
