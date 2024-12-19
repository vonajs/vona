import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // empty
    }
    if (options.version === 2) {
      // all instances
      const instances = await this.app.bean.instance.list();
      for (const instance of instances) {
        await this.bean.executor.newCtx(
          async () => {
            await this._update8AuthsInstance();
          },
          {
            subdomain: instance.name,
          },
        );
      }
    }
  }

  async init(options) {
    if (options.version === 1) {
      // empty
    }
  }

  async _update8AuthsInstance() {
    const provideItem = await this.app.bean.authProvider.getAuthProvider({
      module: __ThisModule__,
      providerName: 'authgithub',
    });
    await this.$scope.auth.model.auth.update(
      {
        providerScene: 'default',
      },
      {
        where: {
          providerId: provideItem.id,
        },
      },
    );
  }
}
