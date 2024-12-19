import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';

let __sequences;

@Bean()
export class BeanSequence extends BeanModuleScopeBase {
  async reset(name) {
    const provider = this._findSequenceProvider(name);
    const sequence = await this._get(name);
    await this.bean.model.update('aSequence', {
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
    return await this.scope.redlock.lockIsolate(`sequence.${moduleName}.${name}`, async () => {
      return await this.bean.sequence.module(moduleName)._nextLock(name);
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
    const value = await this.app.bean._getBean(provider.beanFullName).execute({ value: current });

    // save
    if (sequence) {
      await this.bean.model.update('aSequence', {
        id: sequence.id,
        value: JSON.stringify(value),
      });
    } else {
      // insert
      await this.bean.model.insert('aSequence', {
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
    const sequence = await this.bean.model.get('aSequence', {
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
