import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanModuleScopeBase } from '@cabloy/core';

let __sequences;

@Bean()
export class BeanSequence extends BeanModuleScopeBase {
  async reset(name) {
    const provider = this._findSequenceProvider(name);
    const sequence = await this._get(name);
    await this.ctx.db.update('aSequence', {
      id: sequence.id,
      value: JSON.stringify(provider.start),
    });
  }

  async current(name) {
    const sequence = await this._get(name);
    if (sequence) return JSON.parse(sequence.value);
    const provider = this._findSequenceProvider(name);
    return provider.start;
  }

  async next(name) {
    const moduleName = this.moduleScope;
    return await this.ctx.meta.util.lock({
      resource: `${__ThisModule__}.sequence.${moduleName}.${name}`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: __ThisModule__,
          beanFullName: 'sequence',
          fn: async ({ bean }) => {
            return await bean.module(moduleName)._nextLock(name);
          },
        });
      },
    });
  }

  async _nextLock(name) {
    const provider = this._findSequenceProvider(name);
    const sequence = await this._get(name);

    // current
    let current;
    if (sequence) {
      current = JSON.parse(sequence.value);
    } else {
      current = provider.start;
    }

    // next
    const value = await this.ctx.bean._getBean(provider.beanFullName).execute({ value: current });

    // save
    if (sequence) {
      await this.ctx.db.update('aSequence', {
        id: sequence.id,
        value: JSON.stringify(value),
      });
    } else {
      // insert
      await this.ctx.db.insert('aSequence', {
        iid: this.ctx.instance.id,
        module: this.moduleScope,
        name,
        value: JSON.stringify(value),
      });
    }

    return value;
  }

  async _get(name) {
    // get
    const sequence = await this.ctx.db.get('aSequence', {
      iid: this.ctx.instance.id,
      module: this.moduleScope,
      name,
    });
    return sequence;
  }

  _findSequenceProvider(name) {
    const fullKey = `${this.moduleScope}:${name}`;
    if (!__sequences) {
      __sequences = this._collectSequences();
    }
    return __sequences[fullKey];
  }

  _collectSequences() {
    const sequences: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const providers = module.meta && module.meta.sequence && module.meta.sequence.providers;
      if (!providers) continue;
      for (const key in providers) {
        const provider = providers[key];
        const beanFullName = this.bean.util.combineBeanFullName({
          module: module.info.relativeName,
          scene: 'sequence',
          bean: provider.bean,
        });
        const fullKey = `${module.info.relativeName}:${key}`;
        sequences[fullKey] = {
          ...provider,
          beanFullName,
        };
      }
    }
    return sequences;
  }
}
