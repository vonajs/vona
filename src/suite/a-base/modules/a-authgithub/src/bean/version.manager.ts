import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // empty
    }
    if (options.version === 2) {
      // all instances
      const instances = await this.ctx.bean.instance.list({ where: {} });
      for (const instance of instances) {
        await this.ctx.meta.util.executeBean({
          subdomain: instance.name,
          fn: async ({ ctx }) => {
            const beanInstance = ctx.bean._newBean(VersionManager);
            await beanInstance._update8AuthsInstance();
          },
        });
      }
    }
  }

  async init(options) {
    if (options.version === 1) {
      // empty
    }
  }

  async _update8AuthsInstance() {
    const provideItem = await this.ctx.bean.authProvider.getAuthProvider({
      module: __ThisModule__,
      providerName: 'authgithub',
    });
    await this.getScope('a-auth').model.auth.update(
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
